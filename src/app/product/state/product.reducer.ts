import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';
import { setCurrentProduct } from './actions/product-page.actions';

export interface ProductState {
  products: Product[];
  currentProductId: number | null;
  error: string;
}

const initialState: ProductState = {
  products: [],
  currentProductId: null,
  error: '',
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    ProductApiActions.loadProductsSuccess,
    (state, { products }): ProductState => {
      return {
        ...state,
        products: products,
        error: '',
      };
    }
  ),
  on(ProductApiActions.loadProductFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, action) => {
    return {
      ...state,
      setCurrentProduct: action.currentProductId,
      error: '',
    };
  })
);
