import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SimilarProductsComponent } from './similar-products/similar-products.component';
import { ProductOptionComponent } from './product-option/product-option.component';
import { productReducer } from './state/product.reducer';
import { ProductEffects } from './state/product.effects';
import { ProductReviewsComponent } from '../user/user-reviews/user-reviews.component';
import { CarouselComponent } from '../home/carousel/carousel.component';

const productRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/review', component: ProductReviewsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    CarouselComponent,
    SimilarProductsComponent,
    ProductOptionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(productRoutes),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature('products', productReducer),
  ],
})
export class ProductModule {}
