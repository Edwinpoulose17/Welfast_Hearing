import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
// Simple product data
  product = {
    name: '',
    description: '',
    image: '',
    hasData: false
  };

  loading = true;
  isCalling = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // Simulate loading delay
    setTimeout(() => {
      this.loadProductData();
      this.loading = false;
    }, 1000);
  }

  private loadProductData(): void {
    this.route.queryParams.subscribe(params => {
      // Get product data from query parameters
      this.product.name = params['name'] || '';
      this.product.description = params['description'] || '';
      this.product.image = params['image'] || '';

      // Check if we have basic product data
      this.product.hasData = !!(this.product.name || this.product.description);

      // Set page title
      if (this.product.name) {
        this.titleService.setTitle(`${this.product.name} - Welfast Hearing`);
      } else {
        this.titleService.setTitle('Product Details - Welfast Hearing');
      }

      console.log('Product loaded:', this.product);
    });
  }

  // Handle call now action
  onCallNow(): void {
    this.isCalling = true;

    // Log the product inquiry
    console.log(`Customer wants to purchase: ${this.product.name}`);

    // Open phone dialer after short delay
    setTimeout(() => {
      window.open('tel:+15551234567');

      // Reset calling state
      setTimeout(() => {
        this.isCalling = false;
      }, 2000);
    }, 500);
  }

  // Navigation methods
  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/Hearing-aids']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  goToProducts(): void {
    this.router.navigate(['/Hearing-aids']);
  }

  // Handle image error
  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-product.jpg';
  }
}

