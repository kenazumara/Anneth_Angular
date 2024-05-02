import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { ProductPageActions } from '../state/actions';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  pageTitle: string =  'Product Details';
  selectedProduct$!: Observable<Product>;
  product!: Product;
  similarProducts!: Product[];
  // quantityLeft!: string
  visible: boolean = false;
  errorMessage! : string;
  id!: any;

  constructor(
    private store: Store,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=>{
      const id = params.get('id')
      this.getProduct(id);
      this.getSimilarProducts(id);
    })

    
  }

  trackByImage(index: number, image: string): string {
    return image; // or unique identifier if available
  }

  toggleContent() {
    this.visible = !this.visible;
  }

  getProduct(id: any): void {
    this.productService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err=> this.errorMessage = err.message
      
    });
  }

  getSimilarProducts(id: any) {
    this.productService.getSimilarProducts(id).subscribe((products) => {
      this.similarProducts = products;
    });
  }

  // unitleft(product:Product):any{
  //   if(product.quantity > 10){
  //     this.quantityLeft= 'in stock'
  //   } else if(product.quantity <= 10){
  //     this.quantityLeft= 'few units left'
  //   } else{
  //     this.quantityLeft= product.quantity + 'units left'
  //   }
  //   return this.quantityLeft
  // }

  getQuantityColor(quantity: number): string {
    if (quantity > 200) {
      return 'black';
    } else if (quantity <= 200 && quantity >= 100) {
      return 'orange';
    } else if (quantity === 0) {
      return 'grey';
    } else return 'red';
  }
}
