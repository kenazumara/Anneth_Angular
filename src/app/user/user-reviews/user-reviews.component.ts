// import { Component, OnInit } from '@angular/core';
// import { CartService } from 'src/app/cart/cart.service';

// @Component({
//   selector: 'app-product-reviews',
//   templateUrl: './product-reviews.component.html',
//   styleUrls: ['./product-reviews.component.css'],
// })
// export class ProductReviewsComponent implements OnInit {
//   orders!: any[];
//   product!: any;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.cartService.getOrder().subscribe((order) => {
//       this.orders = order;
//       console.log(this.orders);
//     });
//   }

//   rating: number = 0;
//   stars: boolean[] = Array(5).fill(false);

//   rateProduct(id: any, index: number) {
//     this.rating = index;
//     console.log(this.rating, id);
//     this.updateStars();
//   }

//   updateStars() {
//     this.stars = this.stars.map((_, i) => i < this.rating);
//   }
// }

import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CartService } from 'src/app/user/cart/cart.service';
import { Order, OrderProduct } from 'src/app/user/order';
import { OrdersComponent } from 'src/app/user/orders/orders.component';
import { Product, Review } from '../../product/product';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductReviewsComponent implements OnInit {
  orders: any[] = [];
  prod!: any;
  rating!: number;
  @Input() reviewProducts!: OrderProduct;
  @Input() index!: number;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getOrder().subscribe((order) => {
      this.orders = order;
      // Initialize the ratings for each product
      this.orders.forEach((order) => {
        order.products.forEach((product: any) => {
          this.rating = 0;
          this.prod = product; // Initial rating
        });
      });
      // console.log(this.product);
    });
  }

  saveReview(form: NgForm): Review {
    return {
      rating: form.value.rating,
      comment: form.value.comment,
    } as Review;
  }

  createReview(form: NgForm, id: string) {
    const rating = form.value.rating;
    const comment = form.value.comment;
    this.authService.createReview(rating, comment, id).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('account/order');
    });
  }

  rateProduct(product: any, rating: number) {
    this.rating = rating;
    console.log(`Product: ${product.name}, Rating: ${rating}`);
    console.log(this.prod);
  }
}
