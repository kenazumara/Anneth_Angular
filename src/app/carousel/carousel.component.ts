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

  @Input() filterProduct!: string
  starRated: any
  ratingArr: any = []
  product = { id: 38 }
  currentIndex = 0;
  rating: number = 3.2;
  totalCount: number = 0;
  rating_based_on_star: number = 0;
  data: any = [
    { star: 5, count: 18999 },
    { star: 4, count: 14567 },
    { star: 3, count: 13256 },
    { star: 2, count: 10278 },
    { star: 1, count: 2333 },
  ];

  constructor() {}

  ngOnInit(): void {
    this.calculateRatings();
    this.updateCarousel();

    interval(2000).subscribe(() => {
      this.updateCarousel();
    })
    
  }
  onStarClick(clickedStar: any, productId: number, rating: number): void {
    // Check if the rating for the product already exists
    const existingRating = this.ratingArr.find((ratingData:any) => ratingData['product.id'] === productId);
  
    // If the rating exists, update the star value, otherwise add a new entry
    if (existingRating) {
      existingRating['star'] = rating;

      this.data.forEach((star:any) => (star.clicked = false));
  
      // Set the clicked star to clicked
      clickedStar.clicked = true
    
    } else{
      this.data.forEach((star:any) => (star.clicked = false));

      clickedStar.clicked = true


    }
    let data = {
      'star': rating,
      'product.id': productId
    };

    this.ratingArr.push(data);
    console.log(this.ratingArr);
    localStorage.setItem('rating', JSON.stringify(this.ratingArr));
  }
  

  private updateCarousel(): void {
    let counter = (this.currentIndex % this.images.length) + 1;
    
    const radioElement = document.getElementById('radio' + counter) as HTMLInputElement | null;

    if (radioElement) {
      radioElement.checked = true;
      this.currentIndex = counter++;
      
    }
  }

  private calculateRatings(): void {
    this.data.forEach((item:any) => {
      this.totalCount += item.count;
      this.rating_based_on_star += item.star * item.count;
    });
  }


  isChecked(radioId: string): boolean {
    const radioElement = document.getElementById(radioId) as HTMLInputElement;
    return radioElement?.checked || false;
  }



  // images = [
  //   'image1.jpg',
  //   'image2.jpg',
  //   'image3.jpg',
  //   // ...
  // ];
  // currentIndex = 0;

  timer: any;

  ngAfterViewInit() {
    this.startSlideShow();
  }

  startSlideShow() {
    this.timer = setInterval(() => {
      this.next();
    }, 2000); // 5 seconds
  }

  next() {
    this.currentIndex++;
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }
  }

  onImageLoad(index: any) {
    if (index === this.currentIndex) {
      // Image is visible, animate it in
    }
  }
}
