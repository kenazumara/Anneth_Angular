import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from 'src/app/product/state/product.effects';
import { productReducer } from 'src/app/product/state/product.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProductReviewsComponent } from './user-reviews/user-reviews.component';
import { OrdersComponent } from './orders/orders.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ShippingOptionsComponent } from './shipping-options/shipping-options.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AddressComponent } from './address/address.component';
import { AuthGuard } from './auth.guard';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const userRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'shipping-option', component: ShippingOptionsComponent, canActivate: [AuthGuard] },
  {
    path: 'account',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileInfoComponent },
      { path: 'delivery-address', component: AddressComponent, data: { isMenuOpen: true } },
      { path: 'review', component: ProductReviewsComponent },
      { path: 'order', component: OrdersComponent },
    ],
  },
];

@NgModule({
  declarations: [
    ProfileInfoComponent,
    AddressComponent,
    ShippingOptionsComponent,
    CartComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    ProductReviewsComponent,
    OrdersComponent,
  ],
  imports: [
    MatProgressSpinnerModule,
    RouterModule.forChild(userRoutes),
    EffectsModule.forFeature([ProductEffects]),
    SharedModule,
  ],
})
export class UserModule {}
