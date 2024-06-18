import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
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
  isLoading$!: Observable<boolean>;
  
  constructor(
    private productService: ProductService,
    private store: Store<State>,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Dispatch action here to get products
    this.store.dispatch(ProductPageActions.loadProducts());

    this.isLoading$ = this.productService.isLoading$;

    // // Gets the products from the store
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

  }
}
