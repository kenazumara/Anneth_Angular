import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductState } from './product.reducer';

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.productsError
);

export const getProduct = createSelector(
  getProductFeatureState,
  (state) => state.product
)

export const getPError = createSelector(
  getProductFeatureState,
  (state) => state.productError
);

export const getSimilarProducts = createSelector(
  getProductFeatureState, (state) => state.similarProducts
)
