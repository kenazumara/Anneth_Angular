import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { ProductPageActions } from '../state/actions';
import { Observable, Subscription, timer } from 'rxjs';
import { getError, getProducts } from '../state';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products You May Love!';
  products$!: Observable<Product[]>;
  errorMessage$!: Observable<string>;
  errorMessage!: string;
  products: Product[] = []
  filteredProduct: Product[] = []
  sub!: Subscription


  
  _listFilter: string = ''

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // this.filteredProduct = this.performFilter(this.listFilter);
    this.filteredProduct = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: Product) =>
      product.name.toLowerCase().includes(filterBy)
    )
  }
  // sub: any;
  // errorMessage: string = '';
  // products: Product[] = [];
  // discountedLowPrice!: number;
  // discountedHighPrice!: number;
  // changedPrice!: number;

  constructor(
    private productService: ProductService,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Dispatch action here to get products
    this.store.dispatch(ProductPageActions.loadProducts());

    // // Gets the products from the store
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    //  this.sub = this.productService.getProducts().subscribe({
    //   // next: (products) => (this.products = products),
    //   next: (products) => {
    //     this.products = products;
    //     this.filteredProduct = this.products;
    //     console.log('filteredProduct', this.filteredProduct)
    //   },
    //   error: (err) => (this.errorMessage = err),
    // });

    // this.productService.getprod().subscribe((event) => {
    //   console.log(event);
    //   switch (event.type) {
    //     case HttpEventType.Sent: {
    //       console.log('Request has been made!');
    //       break;
    //     }
    //     case HttpEventType.ResponseHeader: {
    //       console.log('Response header has been received!');
    //       break;
    //     }
    //     case HttpEventType.UploadProgress: {
    //       console.log(
    //         'Upload progress:' +
    //           Math.round((event.loaded / event.total!) * 100) +
    //           '%'
    //       );
    //       break;
    //     }
    //     case HttpEventType.DownloadProgress: {
    //       console.log(
    //         'Download progress:' +
    //           Math.round((event.loaded / event.total!) * 100) +
    //           '%'
    //       );
    //       break;
    //     }
    //     case HttpEventType.Response: {
    //       console.log(event.body);
    //       break;
    //     }
    //   }
    // });

    // this.sub = this.productService.getProducts().subscribe({
    //   next: (products) => (this.products = products),
    //   error: (err) => (this.errorMessage = err),
    // });
  }
}
