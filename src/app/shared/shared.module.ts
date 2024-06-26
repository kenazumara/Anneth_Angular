import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { SpecificationComponent } from './specification/specification.component';
import { CollapsibleWellComponent } from './collapsible-well/collapsible-well.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PopupComponent } from './popup/popup.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StarComponent,
    SpecificationComponent,
    CollapsibleWellComponent,
    ReviewsComponent,
    PopupComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    StarComponent,
    CommonModule,
    CollapsibleWellComponent,
    ReviewsComponent,
  ],
})
export class SharedModule {}
