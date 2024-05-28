// import { Component, OnInit, Renderer2 } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from './cart.service';
// import { CartItem, Items } from './cart';

// @Component({
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems!: CartItem
//   updatedCartItems!: CartItem
//   cartQuantity!: number

//   constructor(private cartService: CartService) { }

//   ngOnInit(): void {
//     this.cartService.getCart().subscribe(data => {
//       this.cartItems = data})

//     this.cartItems?.items.forEach((item: Items) => this.cartQuantity = item.quantity);
//   }

//   // increment(index: number): void {
//   //   this.cartItems.items[index].quantity += 1;
//   //   this.updateCartTotal();
//   //   }

//   getMaxQuantity(item: any): number {
//     const product = item.product;
//     const colorOption = product.color.find((color: any) => color.color === item.color);
//     return colorOption ? colorOption.quantity : 0;
//   }

//   increment(index: number): void {
//     const item = this.cartItems.items[index];
//     if (item.quantity < item.maxQuantity) {
//       item.quantity++;
//       this.updateCart(item._id, item.quantity);
//     }
//   }

//   // decrement(index: number): void {
//   //   if (this.cartItems.items[index].quantity > 1) {
//   //     this.cartItems.items[index].quantity -= 1;
//   //     this.updateCartTotal();
//   //   }  }

//   decrement(index: number): void {
//     const item = this.cartItems.items[index];

//     if (this.cartItems.items[index].quantity > 1) {
//       this.cartItems.items[index].quantity--;
//       this.updateCart(item._id, item.quantity);
//     }
//   }

//   updateCart(id: string, newQuantity: number): void {
//     const item = this.cartItems.items.find(item => item._id === id);
//     console.log(item)
//     if (item) {
//       this.cartService.updateCart(id, newQuantity).subscribe((updatedCart) => {
//         [{...this.cartItems}, updatedCart];
//       });
//     }
//   }
// }
  
//   // private updateCartTotal(): void {
//   //   this.cartItems.items.forEach((item: Items) => this.cartQuantity = item.quantity);
//   // }



// import { Component, OnInit } from '@angular/core';
// import { CartService } from './cart.service';
// import { CartItem, Items } from './cart';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {
//   cartItems!: CartItem;
//   cartQuantity!: number;

//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.loadCart();
//   }

//   loadCart(): void {
//     this.cartService.getCart().subscribe(data => {
//       this.cartItems = data;
//       this.cartQuantity = this.calculateCartQuantity();
//     });
//   }

//   calculateCartQuantity(): number {
//     return this.cartItems.items.reduce((total, item) => total + item.quantity, 0);
//   }

//   getMaxQuantity(item: Items): number {
//     const product = item.product;
//     const colorOption = product?.color.find((color: any) => color.color === item.color);
//     return colorOption ? colorOption.quantity : 0;
//   }

//   increment(index: number): void {
//     const item = this.cartItems.items[index];
//     if (item.quantity < item.maxQuantity) {
//       item.quantity++;
//       this.updateCart(item.id, item.quantity);
//     }
//   }

//   decrement(index: number): void {
//     const item = this.cartItems.items[index];
//     if (item.quantity > 1) {
//       item.quantity--;
//       this.updateCart(item.id, item.quantity);
//     }
//   }

//   updateCart(id: string, newQuantity: number): void {
//     this.cartService.updateCart(id, newQuantity).subscribe(updatedCart => {
//       this.cartItems = updatedCart;
//       this.cartQuantity = this.calculateCartQuantity();
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { CartItem, Items } from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems!: CartItem;
  cartQuantity!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data;
      this.cartQuantity = this.calculateCartQuantity();
    });
  }

  calculateCartQuantity(): number {
    return this.cartItems.items.reduce((total, item) => total + item.quantity, 0);
  }

  getMaxQuantity(item: Items): number {
    const product = item.product;
    const colorOption = product?.color.find((color: any) => color.color === item.color);
    return colorOption ? colorOption.quantity : 0;
  }

  increment(index: number): void {
    const item = this.cartItems.items[index];
    if (item.quantity < item.maxQuantity) {
      item.quantity++;
      this.updateCart(item._id, item.quantity);
    }
  }

  decrement(index: number): void {
    const item = this.cartItems.items[index];
      item.quantity--;
      this.updateCart(item._id, item.quantity);
  }

  updateCart(itemId: string, newQuantity: number): void {
    this.cartService.updateCart(itemId, newQuantity).subscribe(updatedCart => {
      this.cartItems = updatedCart;
      this.cartQuantity = this.calculateCartQuantity();
    });
  }
}
