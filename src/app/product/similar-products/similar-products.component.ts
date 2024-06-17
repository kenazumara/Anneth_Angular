// import { Component, Input, OnInit } from '@angular/core';
// import { ProductService } from '../product.service';
// import { Product } from '../product';
// import {
//   ActivatedRoute,
//   ActivatedRouteSnapshot,
//   NavigationEnd,
//   Router,
// } from '@angular/router';

// @Component({
//   selector: 'similar-products',
//   templateUrl: './similar-products.component.html',
//   styleUrls: ['./similar-products.component.css'],
// })
// export class SimilarProductsComponent implements OnInit {
//   pageTitle: string = 'Products You May Love';
//   @Input() products!: Product[] | null;
//   product!: Product;

//   constructor(
//     private productService: ProductService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.scrollToTop();
//       }
//     });
//   }

//   ngOnInit(): void {
//     const param = this.route.snapshot.paramMap.get('id');
//     const id = param;
//     this.getProducts(id);
//   }

//   getProducts(id: any) {
//     this.productService.getProduct(id).subscribe((product) => {
//       this.product = product;
//       this.router.navigate(['/products', product.id]);
//     });
//   }

//   isProductIdValid(id: any): boolean {
//     return !isNaN(id) && typeof id === 'number';
//   }

//   onBack(productId: string):any {
//     setTimeout(() => {
//       // Navigate to the desired route
//       this.router.navigate(['/products', productId]);

//       // Hide the spinner (toggle the variable for spinner visibility)
//     }, 1000);
//     // location.reload();
//   }

//   scrollToTop() {
//     // Scroll to the top of the page
//     document.body.scrollTop = 0; // For Safari
//     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
//   }

// }

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
})
export class SimilarProductsComponent implements OnInit, OnDestroy {
  pageTitle = 'Products You May Love';
  @Input() products!: Product[] | null;
  product: Product | null = null;
  errorMessage!: string;
  private routerEventsSubscription: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });

    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.getProducts(param);
    }
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  getProducts(id: string): void {
    this.productService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
        this.router.navigate(['/products', product.id]);
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.errorMessage = error;
      },
    });
  }

  onBack(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
