import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';

export const loadProducts = createAction('[Product Page] Load Products');

export const loadProduct = createAction('[Product Page] Load Product',
props<{ id: string }>());


export const LoadPrice = createAction('[Product Page] Load Price', props<{price: number|null}>())