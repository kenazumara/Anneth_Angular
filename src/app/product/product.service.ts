import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  catchError,
  map,
  shareReplay,
  tap,
  throwError,
} from 'rxjs';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    const url = 'http://127.0.0.1:5000/api/v1/products';
    this.loadingSubject.next(true);
    return this.http.get<any>(url).pipe(
      map((data) => data.data.data),
      tap(() => this.loadingSubject.next(false)),
      shareReplay(1),
      catchError((error) => {
        this.loadingSubject.next(false);
        return this.handleError(error);
      })
    );
  }

  getProduct(id: string): Observable<Product> {
    const url = `http://127.0.0.1:5000/api/v1/products/${id}`;
    this.loadingSubject.next(true);
    return this.http.get<any>(url).pipe(
      map((data) => data.data.data),
      tap(() => this.loadingSubject.next(false)),
      catchError((error) => {
        this.loadingSubject.next(false);
        return this.handleError(error);
      })
    );
  }

  getSimilarProducts(id: string): Observable<Product[]> {
    const url = `http://127.0.0.1:5000/api/v1/products/${id}/relatedProducts`;
    this.loadingSubject.next(true);
    return this.http.get<any>(url).pipe(
      map((data) => data.data.products),
      tap(() => this.loadingSubject.next(false)),
      catchError((error) => {
        this.loadingSubject.next(false);
        return this.handleError(error);
      })
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `${err.status}: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
