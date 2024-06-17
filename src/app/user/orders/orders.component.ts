import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/user/cart/cart.service';
import { Order } from '../order';
import { ToastrService } from 'src/app/shared/toastr.service';

@Component({
  selector: 'app-product-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders!: Order[];
  prod!: any;
  errorMessage: any;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.cartService.getOrder().subscribe({
      next: (order) => {
        this.orders = order;
        // Initialize the ratings for each product
        this.orders.forEach((order) => {
          order.products.forEach((product: any) => {
            product.rating = 0;
            this.prod = product; // Initial rating
          });
        });
        // console.log(this.product);
      },
      error: (err) => {
        (this.errorMessage = err), this.toastr.info(err);
      },
    });
  }
}
