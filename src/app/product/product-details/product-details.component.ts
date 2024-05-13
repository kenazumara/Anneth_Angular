import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { ProductPageActions } from '../state/actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getError, getPError, getProduct, getSimilarProducts } from '../state';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product$: Product | null | undefined;
  visible: boolean = false;
  selectedProduct$!: Observable<Product | null>;
  errorMessage$!: Observable<string>;
  similarProducts$!: Observable<Product[] | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(ProductPageActions.loadProduct({ id })); // Dispatch the action with the payload
      }
    });

    this.selectedProduct$ = this.store.select(getProduct);
    this.similarProducts$ = this.store.select(getSimilarProducts);
    this.errorMessage$ = this.store.select(getPError);
  }

  toggleContent() {
    this.visible = !this.visible;
  }

  getQuantityColor(quantity: number): string {
    if (quantity > 200) {
      return 'black';
    } else if (quantity <= 200 && quantity >= 100) {
      return 'orange';
    } else if (quantity === 0) {
      return 'grey';
    } else return 'red';
  }
}
