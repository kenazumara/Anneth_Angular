import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ShellComponent } from './home/shell-component/shell-component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { slideInAnimation } from './animation';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './home/login/login.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SignUpComponent } from './home/sign-up/sign-up.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    LoadingSpinnerComponent,
    CartComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Anneth Commercial App',
      maxAge: 25,
      logOnly: environment.production,
    }),
    ProductModule,
    UserModule,
    AppRoutingModule,
  ],
})
export class AppModule {}
