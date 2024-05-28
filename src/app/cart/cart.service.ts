import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { CartItem, Items } from './cart';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartTotal!: number;
  constructor(private http: HttpClient) {}

  addcart(cart: Items[]) {
    const cartPayload = { cart }; // Wrap the cart items in an object with a 'cart' property
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://127.0.0.1:5000/api/v1/user/create-cart';
    console.log(cartPayload);
    return this.http
      .post<any>(url, cartPayload, { headers, withCredentials: true })
      .pipe(
        map((data) => data),
        shareReplay(1),
        tap((data) => {
          console.log(data);
          // if (data) this.isLoading = false
        })
      );
  }

  getCart() {
    const url = 'http://127.0.0.1:5000/api/v1/user/get-cart';
    return this.http.get<any>(url, { withCredentials: true }).pipe(
      map((data) => data.data),
      tap((data) => {
        console.log(data),
          (this.cartTotal = data.items.length),
          console.log(this.cartTotal);
      })
    );
  }

  updateCart(itemId: string, newQuantity: number): Observable<CartItem> {
    const url = 'http://127.0.0.1:5000/api/v1/user/update-cart';
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(url, { itemId, newQuantity }, { headers, withCredentials: true }).pipe(
      map(data => data.data),
      tap(data => console.log(data))
    );
  }
  
}
