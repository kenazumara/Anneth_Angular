import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ShellComponent } from './home/shell-component/shell-component';
import { ProductModule } from './product/product.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { slideInAnimation } from './animation';

@NgModule({
  declarations: [AppComponent, ShellComponent, LoadingSpinnerComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
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
    AppRoutingModule,
  ],
})
export class AppModule {}
