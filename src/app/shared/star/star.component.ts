// /// <reference lib="es5" />

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from '../../product/product';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
  @Input() rating!: number;
  @Input() product!: Product;

  constructor() {}
}
