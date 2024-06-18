// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, catchError, map, shareReplay, tap, throwError } from 'rxjs';
// import { CartItem, Items } from './cart';
// import { loadStripe, Stripe } from '@stripe/stripe-js';

// import { Product } from '../../product/product';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   cartTotal!: number;
//   private stripe: Stripe | null = null;
//   private loadingSubject = new BehaviorSubject<boolean>(false);
//   isLoading$ = this.loadingSubject.asObservable();

//   constructor(private http: HttpClient) {
//     // this.initializeStripe();
//   }

//   addcart(cart: Items[]) {
//     const cartPayload = { cart }; // Wrap the cart items in an object with a 'cart' property
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const url = 'http://127.0.0.1:5000/api/v1/user/create-cart';
//     this.loadingSubject.next(true);
//     console.log(cartPayload);
//     return this.http
//       .post<any>(url, cartPayload, { headers, withCredentials: true })
//       .pipe(
//         map((data) => data),
//         shareReplay(1),
//         tap((data) => {
//           console.log(data);
//           this.loadingSubject.next(false);
//         }),
//         catchError((error) => {
//           this.loadingSubject.next(false);
//           return this.handleError(error);
//         })
//       );
//   }

//   getCart(totalAmt: number | null) {
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     const url = 'http://127.0.0.1:5000/api/v1/user/get-cart';

//     const body = totalAmt !== null ? JSON.stringify({ totalAmt }) : null;
//     this.loadingSubject.next(true);

//     return this.http
//       .put<any>(url, body, { headers, withCredentials: true })
//       .pipe(
//         map((data) => data.data),
//         tap((data) => {
//           this.loadingSubject.next(false);
//           this.cartTotal = data.items.length;
//         }),
//         catchError((error) => {
//           this.loadingSubject.next(false);
//           return this.handleError(error);
//         })
//       );
//   }

//   updateCart(itemId: string, newQuantity: number): Observable<CartItem> {
//     console.log(typeof itemId, typeof newQuantity);
//     const url = 'http://127.0.0.1:5000/api/v1/user/update-cart';
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     return this.http
//       .put<any>(
//         url,
//         { itemId, newQuantity },
//         { headers, withCredentials: true }
//       )
//       .pipe(
//         map((data) => data.data),
//       );
//   }

//   createOrder() {
//     const url = 'http://127.0.0.1:5000/api/v1/order/checkout-session';
//     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
//     this.loadingSubject.next(true);
//     return this.http
//       .post<any>(url, {}, { headers, withCredentials: true })
//       .pipe(
//         map((data) => data),
//         tap((data) => {
//           this.loadingSubject.next(false)
//         }),
//         catchError((error) => {
//           this.loadingSubject.next(false);
//           return this.handleError(error);
//         })
//       );
//   }

//   getOrder() {
//     const url = 'http://127.0.0.1:5000/api/v1/order';
//     this.loadingSubject.next(true);
//     return this.http.get<any>(url, { withCredentials: true }).pipe(
//       map((data) => data.data.data),
//       tap((data) => {
//         this.loadingSubject.next(false);
//         console.log(data)
//       }),
//       catchError((error) => {
//         this.loadingSubject.next(false);
//         return this.handleError(error);
//       })
//     );
//   }

//   private handleError(err: HttpErrorResponse): Observable<never> {
//     let errorMessage = '';
//     if (err.error instanceof ErrorEvent) {
//       errorMessage = `An error occurred: ${err.error.message}`;
//     } else {
//       errorMessage = `${err.error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(() => errorMessage);
//   }
// }

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { CartItem, Items } from './cart';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartTotal: number = 0;
  private stripe: Stripe | null = null;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  private readonly apiUrl = 'http://127.0.0.1:5000/api/v1';

  constructor(private http: HttpClient) {
    // Optionally initialize Stripe here
    // this.initializeStripe();
  }

  addcart(cart: Items[]): Observable<any> {
    const cartPayload = { cart };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/user/create-cart`;

    this.setLoading(true);

    return this.http
      .post<any>(url, cartPayload, { headers, withCredentials: true })
      .pipe(
        map((data) =>{
          this.setLoading(false)
          return data
        }
        ),
        shareReplay(1),
        tap(() => this.setLoading(false)),
        catchError((error) => this.handleError(error))
      );
  }

  getCart(totalAmt: number | null): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/user/get-cart`;
    const body = totalAmt !== null ? JSON.stringify({ totalAmt }) : null;
    this.setLoading(true);

    return this.http
      .put<any>(url, body, { headers, withCredentials: true })
      .pipe(
        map((data) => data.data),
        tap((data) => {
          this.setLoading(false);
          this.cartTotal = data.items.length;
        }),
        catchError((error) => this.handleError(error))
      );
  }

  updateCart(itemId: string, newQuantity: number): Observable<CartItem> {
    const url = `${this.apiUrl}/user/update-cart`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const payload = { itemId, newQuantity };

    return this.http
      .put<any>(url, payload, { headers, withCredentials: true })
      .pipe(
        map((data) => data.data),
        catchError((error) => this.handleError(error))
      );
  }

  createOrder(): Observable<any> {
    const url = `${this.apiUrl}/order/checkout-session`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.setLoading(true);

    return this.http
      .post<any>(url, {}, { headers, withCredentials: true })
      .pipe(
        map((data) => data),
        tap(() => this.setLoading(false)),
        catchError((error) => this.handleError(error))
      );
  }

  getOrder(): Observable<any> {
    const url = `${this.apiUrl}/order`;
    this.setLoading(true);

    return this.http.get<any>(url, { withCredentials: true }).pipe(
      map((data) => data.data.data),
      tap(() => this.setLoading(false)),
      catchError((error) => this.handleError(error))
    );
  }

  private setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
