export interface Product {
  id: number;
  name: string;
  reviews: Review[];
  ratingsAverage: number;
  description: string;
  tag: string;
  productCategory: number;
  color: Color[];
  lowPrice: number;
  highPrice: number;
  discountedHighPrice: number;
  discountedLowPrice: number;
  priceDiscountPercent: number;
  specification: Specification;
  imageCover: string;
  images: string[];
  quantity: number;
  reviewStat: ReviewsStats;
  ratingsQuantity: number;
}

export interface Color {
  id: string;
  color: string;
  quantity: number;
  discountPrice: number;
  colorImage: string;
}

export interface Specification {
  material: string;
  model: string;
  shipping: boolean;
}

export interface ReviewsStats {
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
}

export interface Review {
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  user: User
}

export interface User{
  name: string
}
