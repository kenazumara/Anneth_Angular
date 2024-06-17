import { ChangeDetectorRef,  Component,  ElementRef, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  images = [
    './assets/img/slide_1.jpg',
    './assets/img/slide_2.jpg',
    './assets/img/slide_3.jpg',
    './assets/img/slide_4.jpg',
    './assets/img/slide_5.jpg',
  ];

  constructor() {}

  ngOnInit(): void {
    
  }
}
