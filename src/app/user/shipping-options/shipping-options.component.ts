import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { CartItem, Items } from '../cart/cart';
import { User } from '../user';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/shared/toastr.service';

@Component({
  selector: 'app-shipping-options',
  templateUrl: './shipping-options.component.html',
  styleUrls: ['./shipping-options.component.css'],
})
export class ShippingOptionsComponent implements OnInit {
  cartItems!: CartItem;
  user!: User;
  today: Date = new Date();
  fiveDays!: Date;
  sevenDays!: Date;
  deliveryFee: number = 0;
  subTotal: number = 0;
  total: number = 0;
  stripePromise: Promise<Stripe | null>;
  buttonText: string = 'Confirm Order';
  isProcessing: boolean = false;
  errorMessage!: any;

  ngOnInit(): void {
    this.loadCartData();
    this.authService.getUser().subscribe((data) => (this.user = data));
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.fiveDays = this.calculateDateAhead(this.today, 5);
    this.sevenDays = this.calculateDateAhead(this.today, 7);
    this.stripePromise = loadStripe(
      'pk_test_51OusquKAHvC2BbJggPo38R5ZkMpSs3mYled2GhhJEPZPSGmSEb32FXm6dw8F20bBLIra31Ju4H7SVCFLMG9yyP5J00b1G6HlKw'
    );
  }

  private loadCartData(): void {
    this.cartService.getCart(this.deliveryFee).subscribe({
      next: (data) => {
        this.cartItems = data; // Assuming data is of type CartItem
        this.calculateFees();
        // Log the deliveryFee after it's been calculated
        console.log('Calculated deliveryFee:', this.deliveryFee);
        // Call the API again to update the server with the correct delivery fee
        this.updateDeliveryFeeOnServer();
      },
      error: (err) => {
        this.toastr.warning(err)
        this.errorMessage = err;
      },
    });
  }

  private calculateDateAhead(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private calculateFees(): void {
    this.subTotal =
      this.cartItems?.items?.reduce(
        (total, item) => total + item.discountPrice * item.quantity,
        0
      ) || 0;
    this.deliveryFee =
      this.cartItems?.items?.reduce(
        (total, item) => total + item.discountPrice * 0.05,
        0
      ) || 0;
    this.total = this.subTotal + this.deliveryFee;
  }

  private updateDeliveryFeeOnServer(): void {
    this.cartService.getCart(this.deliveryFee).subscribe((data) => {
      console.log('Updated cart with delivery fee:', data);
    });
  }

  deliveryFeeCalc(item: Items): number {
    return item.discountPrice * 0.05;
  }

  createOrder() {
    if (!this.authService.isLoggedIn) {
      this.router.navigateByUrl('/login');
    } else {
      this.isProcessing = true;
      this.buttonText = 'Processing...';
      this.cartService.createOrder().subscribe({
        next: async (response) => {
          const stripe = await this.stripePromise;
          console.log(response);
          if (stripe) {
            const sessionId = response.session;
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
              console.error('Error redirecting to checkout:', error);
            }
          } else {
            console.error('Stripe could not be loaded.');
          }
        },
        error: (err)=> {
          this.toastr.warning(err)
          this.errorMessage = err;
        }
      });
    }
  }

  createAddress(){
    this.router.navigateByUrl('/account/address')
  }
}
