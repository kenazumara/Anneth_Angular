// import { Component, Input, OnInit, Renderer2 } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Subject } from 'rxjs';
// import { map, scan } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
// import { CartService } from 'src/app/user/cart/cart.service';
// import { CartItem, Items } from 'src/app/user/cart/cart';
// import { Product } from '../product';
// import { Action } from 'src/app/shared/edit-action';
// import { ToastrService } from 'ngx-toastr';
// import { AuthService } from 'src/app/user/auth.service';

// @Component({
//   selector: 'app-product-option',
//   templateUrl: './product-option.component.html',
//   styleUrls: ['./product-option.component.css'],
// })
// export class ProductOptionComponent implements OnInit {
//   pageTitle: string = 'Product Option';
//   @Input() product!: Product;
//   @Input() index!: number;
//   color: boolean = true;
//   quantity: number = 1;
//   totalCost!: number;
//   cartItem!: CartItem[];
//   errorMessage: any;

//   constructor(
//     private store: Store,
//     private router: Router,
//     private renderer: Renderer2,
//     private cartService: CartService,
//     private toastr: ToastrService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.quantitySelected$.subscribe((qty) => {
//       this.totalCost = this.product.color[this.index].discountPrice * qty;
//     });
//   }

//   increment(): void {
//     if (this.quantity < this.product.color[this.index].quantity) {
//       this.quantity++;
//       this.quantitySelected(this.quantity);
//     }
//   }

//   decrement(): void {
//     if (this.quantity > 1) {
//       this.quantity--;
//       this.quantitySelected(this.quantity);
//     }
//   }

//   get userLoggedIn() {
//     return this.authService.isLoggedIn
//   }

//   quantitySelectedSubject = new BehaviorSubject<number>(this.quantity);
//   quantitySelected$ = this.quantitySelectedSubject.asObservable();

//   quantitySelected(quantity: number): void {
//     this.quantitySelectedSubject.next(quantity);
//   }

//   createCartFromForm(form: NgForm): Items {
//     return {
//       quantity: form.value.quantity,
//       color: form.value.color,
//       id: form.value.id,
//     } as Items;
//   }

//   private itemSubject = new Subject<Action<Items>>();
//   itemAction$ = this.itemSubject.asObservable();

//   cartFromService(form: NgForm): void {
//     const cart = this.createCartFromForm(form);
//     const cartItem = [cart];
//     this.cartService.addcart(cartItem).subscribe({
//         next: () => {
//           if(this.authService.isLoggedIn) {
//             this.toastr.success('Item added to cart successfully')
//             } else {
//               this.toastr.warning('You\'re not logged in')
//               }
//             this.router.navigateByUrl('/cart')
//         },
//         error: (err) => {
//           this.errorMessage = err
//           this.toastr.error('Error adding to cart')
//         },
//       });
//   }

//   hideModal(): void {
//     const modalElement = document.querySelector('.modal');
//     if (modalElement) {
//       this.renderer.removeClass(modalElement, 'show');
//       this.renderer.setStyle(modalElement, 'display', 'none');
//       const backdrop = document.querySelector('.modal-backdrop');
//       if (backdrop) {
//         this.renderer.removeClass(backdrop, 'show');
//         this.renderer.removeChild(document.body, backdrop);
//       }
//     }
//   }

//   addToCart(form: NgForm): void {
//     this.cartFromService(form);
//     this.hideModal();
//   }
// }


import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/user/cart/cart.service';
import { Items } from 'src/app/user/cart/cart';
import { Product } from '../product';
import { Action } from 'src/app/shared/edit-action';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-product-option',
  templateUrl: './product-option.component.html',
  styleUrls: ['./product-option.component.css'],
})
export class ProductOptionComponent implements OnInit {
  @Input() product!: Product;
  @Input() index!: number;
  pageTitle = 'Product Option';
  color = true;
  quantity = 1;
  totalCost: number | undefined;
  cartItem: Items[] = [];
  errorMessage: any;

  quantitySelectedSubject = new BehaviorSubject<number>(this.quantity);
  quantitySelected$ = this.quantitySelectedSubject.asObservable();

  constructor(
    private store: Store,
    private router: Router,
    private renderer: Renderer2,
    private cartService: CartService,
    private toastr: ToastrService,
    private authService: AuthService
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

  get userLoggedIn() {
    return this.authService.isLoggedIn;
  }

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

  cartFromService(form: NgForm): void {
    const cart = this.createCartFromForm(form);
    this.cartService.addcart([cart]).subscribe({
      next: () => {
        if (this.authService.isLoggedIn) {
          this.toastr.success('Item added to cart successfully');
        } else {
          this.toastr.warning('You\'re not logged in');
        }
        this.router.navigateByUrl('/cart');
      },
      error: (err) => {
        this.errorMessage = err;
        this.toastr.error('Error adding to cart');
      },
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
