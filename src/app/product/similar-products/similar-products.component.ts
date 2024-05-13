import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'similar-products',
  templateUrl: './similar-products.component.html',
  styleUrls: ['./similar-products.component.css'],
})
export class SimilarProductsComponent implements OnInit {
  pageTitle: string = 'Products You May Love';
  @Input() products!: Product[] | null;
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    const id = param;
    this.getProducts(id);
  }

  getProducts(id: any) {
    this.productService.getProduct(id).subscribe((product) => {
      this.product = product;
      this.router.navigate(['/products', product.id]);
    });
  }

  isProductIdValid(id: any): boolean {
    return !isNaN(id) && typeof id === 'number';
  }

  onBack(productId: string):any {
    setTimeout(() => {
      // Navigate to the desired route
      this.router.navigate(['/products', productId]);

      // Hide the spinner (toggle the variable for spinner visibility)
    }, 1000);
    // location.reload();
  }

  scrollToTop() {
    // Scroll to the top of the page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }

}
