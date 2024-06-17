import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { ProductPageActions } from '../state/actions';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getPError, getProduct, getSimilarProducts } from '../state';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string = 'Product Details';
  product$: Product | null | undefined;
  visible!: boolean;
  color: boolean = false;
  selectedProduct$!: Observable<Product | null>;
  errorMessage$!: Observable<string>;
  similarProducts$!: Observable<Product[] | null>;

  @ViewChild('modal') modal!: ElementRef;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.store.dispatch(ProductPageActions.loadProduct({ id }));
      }
    });

    this.selectedProduct$ = this.store.select(getProduct);
    this.similarProducts$ = this.store.select(getSimilarProducts);
    this.errorMessage$ = this.store.select(getPError);
  }

  getQuantityColor(quantity: number): string {
    if (quantity > 100) {
      return 'black';
    } else if (quantity <= 100 && quantity >= 20) {
      return 'orange';
    } else if (quantity === 0) {
      return 'grey';
    } else return 'red';
  }
}
