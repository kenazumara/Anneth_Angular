import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './home/shell-component/shell-component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { ToastrModule } from 'ngx-toastr';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { UserModule } from './user/user.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AppComponent, ShellComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    MatProgressSpinnerModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastClass: 'ngx-toastr custom-toast-container custom-toast',
      titleClass: 'custom-toast-title',
      messageClass: 'custom-toast-message',
      preventDuplicates: true,
      timeOut: 3000,
      progressBar: false,
      closeButton: false,
      tapToDismiss: true,
      newestOnTop: true,
      easeTime: 300,
      extendedTimeOut: 1000,
      enableHtml: false,
      easing: 'ease-in',
      // easeTime: 300,
      progressAnimation: 'decreasing',
      disableTimeOut: false,
      // zIndex: 150000000
    }),    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Anneth Commercial App',
      maxAge: 25,
      logOnly: environment.production,
    }),
    UserModule,
    ProductModule,
    AppRoutingModule,
  ],
})
export class AppModule {}
