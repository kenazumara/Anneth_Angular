import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  combineLatest,
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
  constructor(private http: HttpClient) {}

  getProducts() {
    const url = 'http://127.0.0.1:5000/api/v1';
    return this.http.get<any>(url + '/products').pipe(
      map((data) => data.data.data),
      shareReplay(1),
      tap((data) => {
        // console.log(data)
      }),
      shareReplay(1),
      catchError(this.handleError)
    );
  }

  getprod() {
    const request = new HttpRequest('GET', 'http://127.0.0.1:5000/api/v1/products',
      {reportProgress: true,}
    )
    return this.http.request(request)
  }

  getProduct(id: string): Observable<Product> {
    const url = 'http://127.0.0.1:5000/api/v1/products';
    return this.http.get<any>(`${url}/${id}`).pipe(
      map((data) => data.data.data),
      catchError(this.handleError)
    );
  }

  getSimilarProducts(id: string) {
    const url = `http://127.0.0.1:5000/api/v1/products/${id}/relatedProducts`;
    return this.http.get<any>(url).pipe(
      map((data) => (data.data.products)),
      catchError(this.handleError)
    );
  }

  // private selectedProductSubject =new Subject<number>()
  // selectedProductAction$ = this.selectedProductSubject.asObservable()

  // selectedProduct$ = combineLatest([
  //   this.products$,
  //   this.selectedProductAction$
  // ]).pipe(
  //   map(([products, selectedId])=>{
  //     selectedId = 5f34d519883c8c0017f7e2ef;
  //     products.find((product: Product)=>product.id === selectedId)
  //   }
  //   ),
  //   tap(data=> console.log('data:' + data),
  //   shareReplay(1)
  //   )
  // )

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `${err.error.status}: ${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
