import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ProductService } from './product/product.service';
import { LoginService } from './home/login/login.service';
import { Store } from '@ngrx/store';
import { toggleNavBar } from './state/action/app-page-action';
import { AuthService } from './shared/auth.service';
import { CartService } from './cart/cart.service';
import { CartItem } from './cart/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'anneth-collections';
  isSpinning: boolean = true;
  cartTotal!: number;

  constructor(
    private router: Router,
    private productService: ProductService,
    private store: Store,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.router.events.subscribe((routerEvent: Event): void => {
      this.checkRouterEvent(routerEvent);
    });
    console.log(this.cartTotal);

    if (this.userLoggedIn) {
      this.cartService.getCart().subscribe();
    }
  }
  get cartTotalItems() {
    return this.cartService.cartTotal;
  }

  get userLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  get spinner(): boolean {
    return this.productService.isLoading;
  }

  logOut() {
    this.authService.logout().subscribe((loggedOut) => {
      this.router.navigate(['/login']);
    });
  }

  // onClick() {
  //   this.store.dispatch(toggleNavBar())
  //   this.router.navigate(['/login'])
  //   this.authservice.loginPage = false
  // }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.isSpinning = true;
      console.log('Navigation start - Spinner should be visible');
      // setInterval(()=> {
      //   this.isSpinning = false
      // }, 3000)
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
