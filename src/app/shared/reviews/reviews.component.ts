// import { Component, Input, OnInit } from '@angular/core';
// import { Product } from 'src/app/product/product';

// @Component({
//   selector: 'reviews',
//   templateUrl: './reviews.component.html',
//   styleUrls: ['./reviews.component.css']
// })
// export class ReviewsComponent implements OnInit {
// @Input() product!: Product
// bars: number[] = Array.from({ length: this.product.ratingsQuantity }, (_, index) => index + 1);

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

// import {
//   Component,
//   Input,
//   OnChanges,
//   OnInit,
//   SimpleChanges,
// } from '@angular/core';
// import { Product } from 'src/app/product/product';

// @Component({
//   selector: 'reviews',
//   templateUrl: './reviews.component.html',
//   styleUrls: ['./reviews.component.css'],
// })
// export class ReviewsComponent implements OnInit, OnChanges {
//   @Input() product!: Product;
//   bars: number[] = [];
//   stars!: any;
//   width!: number;
//   reviewArray: any[] = [];

//   constructor() {}

//   ngOnInit(): void {
//     // Assuming this.product.reviews is an array of objects with a 'rating' property
//     // this.product.reviews.forEach((review, index) => {
//     //   const rating = review.rating;
//     //   console.log(`${this.bars} ${index + 1}: ${rating}`);
//     // });
//     if (this.product && this.product.reviewStats) {
//       this.stars = this.product.reviewStats;
//       this.reviewArray = Object.entries(this.stars);
//       console.log(this.stars);
//       console.log(this.reviewArray);
//       console.log(this.reviewArray);
//     }
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     // this.width = this.product.ratingsQuantity / this.product.reviewStats.
//   }

//   // getObjectKeys(obj: any): string[] {
//   //   return Object.keys(obj);
//   // }

//   getSortedObjectKeys(obj: any): string[] {
//     return Object.keys(obj).sort((a, b) => b.localeCompare(a));
//   }

//   // In your component class
// getFilledStars(rating: number): number[] {
//   return Array.from({ length: rating }, (_, index) => index);
// }

  

//   getDescendingNumbers(): number[] {
//     const totalNumbers = 5; // Replace with the total number of items you want to display
//     return Array.from(
//       { length: totalNumbers },
//       (_, index) => totalNumbers - index
//     );
//   }
// }

// reviews.component.ts
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

    // this.reviewArray.forEach(review=> {
    //   total
    // })
  }



  getEmptyStars(rating: number): number[] {
    const totalStars = 5;
    const emptyStars = totalStars - rating;
    return Array.from({ length: emptyStars }, (_, index) => index);
  }

  getDescendingNumbers(): number[] {
    const totalNumbers = 5;
    return Array.from({ length: totalNumbers }, (_, index) => totalNumbers - index);
  }

  toggleContent(){
    this.visible= !this.visible
  }
}
