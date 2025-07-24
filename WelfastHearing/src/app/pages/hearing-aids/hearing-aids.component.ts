import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ServiceService } from '../../services/service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hearing-aids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hearing-aids.component.html',
  styleUrl: './hearing-aids.component.css'
})
export class HearingAidsComponent {

  constructor(private meta: Meta,
    private title: Title, private serviceService: ServiceService) {
    // Set page title
    this.title.setTitle('Hearing Aids in Central Coast | Bluetooth & Rechargeable Options');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Explore high-quality hearing aids at Welfast Hearing, including Bluetooth and rechargeable options. We also provide hearing tests and micro suction ear wax removal for complete hearing wellness.'
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hearing Aids in Central Coast, Bluetooth Hearing Aids, Rechargeable Hearing Aids, Digital Hearing Aids Central Coast, Hearing Aid Fitting Central Coast, Advanced Hearing Aids'
    });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Hearing Aids in Central Coast | Bluetooth & Rechargeable Options' });
    this.meta.updateTag({ property: 'og:description', content: 'High-quality hearing aids including Bluetooth and rechargeable options in Central Coast.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://welfasthearing.com.au/assets/hearingProducts/earbudtype.webp' });
    this.meta.updateTag({ property: 'og:url', content: 'https://welfasthearing.com.au/Hearing-aids' });

    // Set canonical URL
    this.setCanonicalUrl('https://welfasthearing.com.au/Hearing-aids');
  }
  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement = document.querySelector("link[rel='canonical']") || document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  // Your existing arrays - these will be populated from API
  hearingAidsList: any[] = [];
  hearingAidAccessoriesList: any[] = [];
  assistiveListeningDevicesList: any[] = [];

  loading = true;



  ngOnInit(): void {
    this.loadProductsFromAPI();
  }

  loadProductsFromAPI(): void {
    this.loading = true;

    this.serviceService.get_Products().subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Products API Response:', response); // Debug log

        if (response.success && response.data) {
          // Process all products from API
          const allProducts = response.data.map((apiProduct: any) => ({
            // Map API fields to your UI structure
            title: apiProduct.heading, // API 'heading' → UI 'title'
            subtitle: this.generateSubtitle(apiProduct.heading), // Generate subtitle from title
            description: apiProduct.content, // API 'content' → UI 'description'
            image: environment.url + apiProduct.image, // Create full image URL
            type: apiProduct.type // Keep the type for filtering
          }));
          console.log('All Products:', allProducts); // Debug log
          // Filter products by type into separate arrays
          this.hearingAidsList = allProducts.filter((product: any) =>
            product.type === 'hearing-a'
          );

          this.hearingAidAccessoriesList = allProducts.filter((product: any) =>
            product.type === 'hearing-b'
          );

          this.assistiveListeningDevicesList = allProducts.filter((product: any) =>
            product.type === 'hearing-c'
          );

          console.log('Hearing Aids:', this.hearingAidsList);
          console.log('Accessories:', this.hearingAidAccessoriesList);
          console.log('Assistive Devices:', this.assistiveListeningDevicesList);
        } else {
          console.error('API response not successful:', response);
          this.setFallbackData(); // Optional: Set empty or fallback data
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading products:', error);
        this.setFallbackData(); // Optional: Set empty or fallback data
      }
    });
  }

  // Generate a subtitle from the title (optional - you can customize this)
  generateSubtitle(title: string): string {
    // You can customize this logic based on your needs
    // For now, it creates a simple subtitle
    return `Advanced ${title.toLowerCase()} technology`;
  }

  // Optional: Set empty arrays if API fails
  setFallbackData(): void {
    this.hearingAidsList = [];
    this.hearingAidAccessoriesList = [];
    this.assistiveListeningDevicesList = [];
  }

  // Optional: Method to refresh products
  refreshProducts(): void {
    this.loadProductsFromAPI();
  }

  // Optional: Get products by category (if you need it elsewhere)
  getProductsByType(type: string): any[] {
    switch (type) {
      case 'hearing-aids':
        return this.hearingAidsList;
      case 'hearing-aid-accessories':
        return this.hearingAidAccessoriesList;
      case 'assistive-listening-devices':
        return this.assistiveListeningDevicesList;
      default:
        return [];
    }
  }

}
