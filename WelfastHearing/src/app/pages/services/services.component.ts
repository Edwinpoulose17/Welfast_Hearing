import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HearingAidsComponent } from '../products/hearing-aids/hearing-aids.component';
import { HearingaidService } from '../hearingService/hearingaid.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ServiceService } from '../../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  services: any[] = [];
  loading = true;

  constructor(
    private servicesService: ServiceService,
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {
    this.title.setTitle(
      'Comprehensive Hearing Services – Tests, Aids & Wax Removal'
    );

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content:
        'Explore professional hearing services at Welfast Hearing—Hearing Tests, Micro Suction Ear Wax Removal, Bluetooth Hearing Aids, and Rechargeable Hearing Aids. Expert care in Central Coast & Lake Macquarie.',
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content:
        'Hearing Services in Central Coast, Hearing Tests Central Coast, Micro Suction Ear Wax Removal, Hearing Aids Central Coast, Rechargeable Hearing Aids, Bluetooth Hearing Aids, Audiology Services in Central Coast',
    });

    // Set Open Graph tags
    this.meta.updateTag({
      property: 'og:title',
      content: 'Comprehensive Hearing Services – Tests, Aids & Wax Removal',
    });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Professional hearing services including tests, hearing aids, and ear wax removal in Central Coast.',
    });
    this.meta.updateTag({
      property: 'og:image',
      content:
        'https://welfasthearing.com.au/assets/hearingService/microsuction.jpeg',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://welfasthearing.com.au/Services',
    });

    // Set canonical URL
    this.setCanonicalUrl('https://welfasthearing.com.au/Services');
  }
  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") ||
      document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  ngOnInit(): void {
    this.loadServicesFromAPI();
  }

  loadServicesFromAPI(): void {
    this.loading = true;

    this.servicesService.get_services().subscribe({
      next: (response: any) => {
        this.loading = false;
        console.log('API Response:', response); // Debug log

        if (response.success && response.data) {
          // Map API data to your existing structure
          this.services = response.data.map((apiService: any) => ({
            // Map API fields to your UI structure
            title: apiService.heading, // API 'heading' → UI 'title'
            fullContent: apiService.content, // API 'content' → UI 'fullText'
            image: environment.url + apiService.image,
            slug: this.toSeoFriendly(apiService.heading), // Create full image URL

            // Keep your existing UI functionality
            showMore: false, // Default collapsed state

            // Add default subsections if you want (optional)
            subsections: [
              // You can populate these from API if available, or leave empty
              // {
              //   title: "Key Features",
              //   content: "",
              //   points: []
              // }
            ],
          }));
          console.log('Mapped Services:', this.services); // Debug log
        } else {
          console.error('API response not successful:', response);
        }
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Error loading services:', error);

        // Optional: Add fallback data or error handling
        this.services = [];
      },
    });
  }
  toSeoFriendly(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // replace spaces with dashes
      .replace(/[^\w\-]+/g, '') // remove non-word characters
      .replace(/\-\-+/g, '-') // replace multiple dashes with one
      .replace(/^-+/, '') // trim dashes from start
      .replace(/-+$/, ''); // trim dashes from end
  }

  // Keep your existing toggleReadMore method EXACTLY as it is
  toggleReadMore(card: any): void {
    console.log(card);
    this.router.navigate(['/service-details', card.slug], { state: { card } });
  }

  // If you want to add subsections dynamically from API data, use this method
  // (Optional - only if your API provides additional structured content)
  private parseAdditionalContent(content: string): any[] {
    // Example: If your API content has structured data
    // You can parse it here to create subsections
    // For now, return empty array to keep existing functionality
    return [];
  }

  // Optional: Method to refresh services
  refreshServices(): void {
    this.loadServicesFromAPI();
  }
}
