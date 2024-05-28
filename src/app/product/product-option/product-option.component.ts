import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/cart/cart.service';
import { CartItem, Items } from 'src/app/cart/cart';
import { Product } from '../product';
import { Action } from 'src/app/shared/edit-action';

@Component({
  selector: 'app-product-option',
  templateUrl: './product-option.component.html',
  styleUrls: ['./product-option.component.css'],
})
export class ProductOptionComponent implements OnInit {
  pageTitle: string = 'Product Option';
  @Input() product!: Product;
  @Input() index!: number;
  color: boolean = true;
  quantity: number = 1;
  totalCost!: number;
  cartItem!: CartItem[];

  constructor(
    private store: Store,
    private router: Router,
    private renderer: Renderer2,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.quantitySelected$.subscribe((qty) => {
      this.totalCost = this.product.color[this.index].discountPrice * qty;
    });
  }

  increment(): void {
    if (this.quantity < this.product.color[this.index].quantity) {
      this.quantity++;
      this.quantitySelected(this.quantity);
    }
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantitySelected(this.quantity);
    }
  }

  quantitySelectedSubject = new BehaviorSubject<number>(this.quantity);
  quantitySelected$ = this.quantitySelectedSubject.asObservable();

  quantitySelected(quantity: number): void {
    this.quantitySelectedSubject.next(quantity);
  }

  createCartFromForm(form: NgForm): Items {
    return {
      quantity: form.value.quantity,
      color: form.value.color,
      id: form.value.id,
    } as Items;
  }

  private itemSubject = new Subject<Action<Items>>();
  itemAction$ = this.itemSubject.asObservable();

  cartFromService(form: NgForm): void {
    const cart = this.createCartFromForm(form);
    const cartItem = [cart];
    this.cartService.addcart(cartItem).subscribe({
      next: () => this.router.navigateByUrl('/cart'),
      error: (err) => console.error('Error adding to cart:', err),
    });
  }

  hideModal(): void {
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      this.renderer.setStyle(modalElement, 'display', 'none');
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        this.renderer.removeClass(backdrop, 'show');
        this.renderer.removeChild(document.body, backdrop);
      }
    }
  }

  addToCart(form: NgForm): void {
    this.cartFromService(form);
    this.hideModal();
  }
}
