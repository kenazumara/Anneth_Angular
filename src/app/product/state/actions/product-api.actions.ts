import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProductsSuccess = createAction(
  '[Product Api] Load Product Success',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product Api] Load Product Failed',
  props<{ error: string }>()
);
