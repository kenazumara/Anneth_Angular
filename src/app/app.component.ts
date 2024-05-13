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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'anneth-collections';
  isSpinning: boolean = true;

  constructor(private router: Router, private productService: ProductService) {
    this.router.events.subscribe((routerEvent: Event): void => {
      this.checkRouterEvent(routerEvent);
    });
  }

  get spinner(): boolean {
    return this.productService.isLoading
  }

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
