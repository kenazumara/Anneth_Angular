import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ProductService } from './product/product.service';
import { Store } from '@ngrx/store';
import { CartService } from './user/cart/cart.service';
import { Product } from './product/product';
import { AuthService } from './user/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { combineLatest, map } from 'rxjs';
import { ToastrService } from './shared/toastr.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'anneth-collections';
  isSpinning: boolean = true;
  product!: Product[];
  isLoading$: any;
  currentUser: any;
  imageUrl!: string;

  constructor(
    private router: Router,
    private productService: ProductService,
    private store: Store,
    private authService: AuthService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.router.events.subscribe((routerEvent: Event): void => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit(): void {
    // this.http
    //   .get<{ url: string }>(
    //     'http://127.0.0.1:5000/image/product/250x250_product_662612ccf24371f48eeb21eb-1713771212399-cover.jpeg'
    //   )
    //   .subscribe((response) => {
    //     this.imageUrl = response.url;
    //     console.log(this.imageUrl)
    //   },
    //   error => {
    //     console.error('Error fetching image URL:', error);
    //   });

    this.isLoading$ = combineLatest([
      this.productService.isLoading$,
      this.authService.isLoading$,
      // Add other service loading observables as needed
    ]).pipe(
      map(([productLoading, authLoading]) => productLoading || authLoading)
    );

    this.isLoading$.subscribe(() => {
      this.cdr.detectChanges();
    });

    this.isLoading$.subscribe(() => {
      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    });
  }

  ngAfterViewInit(): void {
  
  }

  get cartTotalItems() {
    return this.cartService.cartTotal;
  }

  get userLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.logout().subscribe((loggedOut) => {
      this.router.navigate(['/login']);
      this.toastr.info("You're Logged Out");
    });
  }

  isHovered = false;
  isHoveredText = false;

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.isSpinning = true;

      if (this.userLoggedIn) {
        this.cartService.getCart(null).subscribe(() => {});
      }
      if (this.userLoggedIn) {
        this.authService.getUser().subscribe((user) => {
          this.currentUser = user;
        });
      }
      if (
        routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel
      ) {
        this.isSpinning = false;
        console.log('Navigation ends - Spinner should be hidden');
      }
    }
  }
}
