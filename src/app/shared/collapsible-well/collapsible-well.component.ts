import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/product/product';

@Component({
  selector: 'collapsible-well',
  templateUrl: './collapsible-well.component.html',
  styleUrls: ['./collapsible-well.component.css'],
})
export class CollapsibleWellComponent implements OnInit {
  @Input() product!: Product;
  visible!: boolean;
  constructor() {}

  ngOnInit(): void {}

  toggleContent() {
    this.visible = !this.visible;
  }
}
