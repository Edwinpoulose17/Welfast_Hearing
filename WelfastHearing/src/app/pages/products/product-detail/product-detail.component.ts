import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {

  product = {
    name: '',
    description: '',
    image: '',
    hasData: false,
    slug: '',
  };

  productSchema: string = '';
  loading = true;
  isCalling = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.loadProductData();
      this.loading = false;
    }, 1000);
  }

  private loadProductData(): void {
    const stateCard = history.state?.card;
    console.log('Card from state:', stateCard);

    if (stateCard) {
      this.setPageData(stateCard);
      console.log('Loaded card from navigation state:', stateCard);
    } else {
      const slug = this.route.snapshot.paramMap.get('slug');
      if (!slug) {
        this.router.navigate(['/']);
        return;
      }

      this.product.name = 'Content not available';
      this.product.description =
        'Please navigate from the homepage or fetch content dynamically by slug.';
      this.product.hasData = true;

      this.titleService.setTitle('Welfast Hearing - Details');
      this.meta.updateTag({
        name: 'description',
        content: this.product.description,
      });

      this.generateSchema();
    }
  }

  private setPageData(card: any) {
    this.product.name = card?.title || '';
    this.product.description = card?.description || '';
    this.product.image = card?.image || '';
    this.product.slug = card?.slug || '';
    this.product.hasData = true;

    this.titleService.setTitle(`${card.title} - Welfast Hearing`);
    this.meta.updateTag({ name: 'description', content: card.fullContent });
    this.meta.updateTag({ property: 'og:title', content: card.title });
    this.meta.updateTag({ property: 'og:description', content: card.fullContent });
    this.meta.updateTag({ property: 'og:image', content: card.image });
    this.meta.updateTag({
      property: 'og:url',
      content: `https://welfasthearing.com.au/why-choose-welfast/${card.slug}`,
    });

    this.generateSchema();
  }

  // 🔥 JSON-LD Product Schema Generator
  private generateSchema() {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.product.name,
      "image": this.product.image,
      "description": this.product.description,
      "brand": {
        "@type": "Brand",
        "name": "Welfast Hearing"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "AUD",
        "price": "0.00",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "url": `https://welfasthearing.com.au/why-choose-welfast/${this.product.slug}`
      }
    };

    this.productSchema = JSON.stringify(schema);
  }

  onCallNow(): void {
    this.isCalling = true;
    console.log(`Customer wants to purchase: ${this.product.name}`);

    setTimeout(() => {
      window.open('tel:+15551234567');
      setTimeout(() => {
        this.isCalling = false;
      }, 2000);
    }, 500);
  }

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

  onImageError(event: any): void {
    event.target.src = 'assets/images/placeholder-product.jpg';
  }
}
