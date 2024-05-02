import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products =>
            ProductApiActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductFailure({ error }))
          )
        )
      )
    );
  });
}
