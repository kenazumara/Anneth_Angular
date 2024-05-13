import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import { ProductApiActions, ProductPageActions } from './actions';

export interface ProductState {
  products: Product[];
  product: Product | null
  similarProducts: Product[] | null;
  currentProductId: string | null;
  productError: string,
  productsError: string
};


const initialState: ProductState = {
  products: [],
  product: null,
  similarProducts: null,
  currentProductId: null,
  productError: '',
  productsError:''
};

export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    ProductApiActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        productsError: '',
      };
    }
  ),
  on(ProductApiActions.loadProductsFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      productsError: action.error,
    };
  }),
  on(ProductApiActions.loadProductSuccess, (state, action) => {
    return{
      ...state,
      product: action.product,
      productError: ''
    }
  }),
  on(ProductApiActions.loadProductFailure, (state, action): ProductState => {
    return {
      ...state,
      product: null,
      similarProducts: null,
      productError: action.error
    };
  }),
  on(ProductApiActions.loadSimilarProductSuccess, (state, action) => {
    return {
      ...state,
      similarProducts: action.products,
      productError: ''
    }
  })
);
