import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction('[Product Page] Load Products');

export const loadProduct = createAction('[Product Page] Load Product',
props<{ id: string }>());
