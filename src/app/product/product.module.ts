import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';
import { CarouselComponent } from '../carousel/carousel.component';
import { SimilarProductsComponent } from './similar-products/similar-products.component';
import { FormsModule } from '@angular/forms';
import { ProductOptionComponent } from './product-option/product-option.component';

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
    FormsModule,
    RouterModule.forChild(productRoutes),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature('products', productReducer),
    SharedModule,
  ],
})
export class ProductModule {}
