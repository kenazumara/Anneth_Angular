import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/product/product';

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @Input() product!: Product;
  stars: any = {};
  reviewArray: any[] = [];
  visible: boolean=true

  constructor() {}

  ngOnInit(): void {
    if (this.product && this.product.reviewStat) {
      this.stars = this.product.reviewStat;
      this.reviewArray = Object.entries(this.stars);
    }
  }

  toggleContent(){
    this.visible= !this.visible
  }
}
