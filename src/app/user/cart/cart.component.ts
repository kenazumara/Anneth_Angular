import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem, Items } from './cart';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getProducts } from '../../product/state';
import { ProductPageActions } from '../../product/state/actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  pageTitle: string = 'Recommended for you';
  cartItems!: CartItem;
  cartQuantity!: number;
  cartAmount!: number;
  products$!: Observable<Product[]>;
  spinner!: boolean
  isLoading: boolean[] = [];
  errorMessage: any;
  error: string = ''

  constructor(
    private toastr: ToastrService,
    private cartService: CartService,
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());

    this.products$ = this.store.select(getProducts);

    this.loadCart();

    if(this.cartItems){
      this.isLoading = this.cartItems.items.map(() => false);
    }

  }

  loadCart(): void {
    this.cartService.getCart(null).subscribe({
      next: (data) => {
        this.cartItems = data;
        this.cartQuantity = this.calculateCartQuantity();
      },
      error: (err) => {
        this.errorMessage = err
        this.toastr.info(err);
      }
    });
  }
  

  // Calculate total items in cart
  calculateCartQuantity(): number {
    return this.cartItems.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Gets the total quanity of items available
  getMaxQuantity(item: Items): number {
    const product = item.product;
    const colorOption = product?.color.find(
      (color: any) => color.color === item.color
    );
    return colorOption ? colorOption.quantity : 0;
  }

  // Method to add quantity of item
  increment(index: number): void {
    const item = this.cartItems.items[index];
    if (item.quantity < item.maxQuantity) {
      this.setLoadingState(index, true);
      item.quantity++;
      this.updateCart(item._id, item.quantity, index);
    }
  }


  //Method to reduce quantity of item
  decrement(index: number): void {
    const item = this.cartItems.items[index];
    this.setLoadingState(index, true);
    item.quantity--;
    this.updateCart(item._id, item.quantity, index);
  }

 
  deleteCart(index: number): void {
    const item = this.cartItems.items[index];
    this.setLoadingState(index, true);
    this.updateCart(item._id, 0, index);
  }

  updateCart(itemId: string, newQuantity: number, index: number): void {
    this.cartService.updateCart(itemId, newQuantity).subscribe((updatedCart) => {
      this.cartItems = updatedCart;
      this.cartQuantity = this.calculateCartQuantity();
      this.setLoadingState(index, false);
    }, () => {
      this.setLoadingState(index, false); // Reset loading state on error
    });
  }

  // Loading spinner
  private setLoadingState(index: number, state: boolean): void {
    this.isLoading[index] = state;
  }

  getQuantityColor(quantity: number): string {
    if (quantity > 45) {
      return 'black';
    } else if (quantity <= 45 && quantity >= 30) {
      return 'orange';
    } else if (quantity === 0) {
      return 'grey';
    } else return 'red';
  }
}
