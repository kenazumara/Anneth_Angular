import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductEffects } from 'src/app/product/state/product.effects';
import { productReducer } from 'src/app/product/state/product.reducer';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { AddressComponent } from './address/address.component';


const userRoutes: Routes = [
  {path: 'account', component: ProfileComponent,
    children: [
      {path: 'profile', component: ProfileInfoComponent},
      {path: 'delivery-address', component: AddressComponent}
    ]
  }
];

@NgModule({
  declarations: [
    ProfileInfoComponent,
    AddressComponent
  ],
  imports: [
    RouterModule.forChild(userRoutes),
    EffectsModule.forFeature([ProductEffects]),
    // StoreModule.forFeature('user', userReducer),
    SharedModule,
  ],
})
export class UserModule {}
