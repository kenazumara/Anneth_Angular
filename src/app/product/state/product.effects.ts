import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Product } from '../product';

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
          map((products) =>
            ProductApiActions.loadProductsSuccess({ products })
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProduct),
      switchMap((action) =>
        this.productService.getProduct(action.id).pipe(
          map((product) => ProductApiActions.loadProductSuccess({ product })),
          catchError((error) =>
            of(ProductApiActions.loadProductFailure({ error }))
          )
        )
      )
    );
  });

  loadSimilarProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProduct),
      switchMap((action) =>
        this.productService.getSimilarProducts(action.id).pipe(
          map((products) =>
            ProductApiActions.loadSimilarProductSuccess({ products })
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductFailure({ error }))
          )
        )
      )
    );
  });
}
