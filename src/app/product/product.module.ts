// // src/app/product/product.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';

// import { SharedModule } from '../shared/shared.module';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductDetailsComponent } from './product-details/product-details.component';
// import { CarouselComponent } from '../carousel/carousel.component';
// import { SimilarProductsComponent } from './similar-products/similar-products.component';
// import { ProductOptionComponent } from './product-option/product-option.component';
// import { productReducer } from './state/product.reducer';
// import { ProductEffects } from './state/product.effects';

// const productRoutes: Routes = [
//   { path: 'products', component: ProductListComponent },
//   { path: 'products/:id', component: ProductDetailsComponent },
//   { path: '', redirectTo: 'products', pathMatch: 'full' },
// ];

// @NgModule({
//   declarations: [
//     ProductListComponent,
//     ProductDetailsComponent,
//     CarouselComponent,
//     SimilarProductsComponent,
//     ProductOptionComponent
//   ],
//   imports: [
//     SharedModule, // Import SharedModule to include CommonModule and FormsModule
//     RouterModule.forChild(productRoutes),
//     EffectsModule.forFeature([ProductEffects]),
//     StoreModule.forFeature('products', productReducer),
//   ],
// })
// export class ProductModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { SimilarProductsComponent } from './similar-products/similar-products.component';
import { ProductOptionComponent } from './product-option/product-option.component';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';

const productRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CarouselComponent,
    SimilarProductsComponent,
    ProductOptionComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature('products', productReducer),
  ],
})
export class ProductModule {}
