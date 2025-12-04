// detailed-page.component.ts
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailed-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-page.component.html',
  styleUrl: './detailed-page.component.css'
})
export class DetailedPageComponent implements OnInit {

  pageData = {
    title: '',
    content: '',
    image: '',
    slug: '',
    hasContent: false
  };

  loading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadContent();
      this.loading = false;
    }, 300);
  }

  private loadContent(): void {
    // Try to get card data from navigation state first
    const nav = this.router.getCurrentNavigation();
    const stateCard = history.state?.card;
    console.log('Card from state:', stateCard);

    if (stateCard) {
      this.setPageData(stateCard);
      console.log('Loaded card from navigation state:', stateCard);
    } else {
      // Fallback: user opened URL directly — get slug from route
      const slug = this.route.snapshot.paramMap.get('slug');
      if (!slug) {
        this.router.navigate(['/']);
        return;
      }

      // For demo, we can just log warning — ideally fetch from API by slug
      console.warn('No card data from navigation state. Fetch data using slug:', slug);
      this.pageData.title = 'Content not available';
      this.pageData.content = 'Please navigate from the homepage or fetch content dynamically by slug.';
      this.pageData.hasContent = true;

      this.titleService.setTitle('Welfast Hearing - Details');
      this.meta.updateTag({ name: 'description', content: this.pageData.content });
    }
  }

  private setPageData(card: any) {
    this.pageData.title = card.title;
    this.pageData.content = card.fullContent;
    this.pageData.image = card.image;
    this.pageData.slug = card.slug;
    this.pageData.hasContent = true;


    // Set SEO-friendly meta tags
    this.titleService.setTitle(`${card.title} - Welfast Hearing`);
    this.meta.updateTag({ name: 'description', content: card.fullContent });
    this.meta.updateTag({ property: 'og:title', content: card.title });
    this.meta.updateTag({ property: 'og:description', content: card.fullContent });
    this.meta.updateTag({ property: 'og:image', content: card.image });
    this.meta.updateTag({ property: 'og:url', content: `https://welfasthearing.com.au/why-choose-welfast/${card.slug}` });
  }

  getFormattedContent(): string {
    if (!this.pageData.content) return '<p>No content available.</p>';
    return `<p>${this.pageData.content.replace(/\n/g, '<br>')}</p>`;
  }

  goBack(): void {
    if (window.history.length > 1) window.history.back();
    else this.router.navigate(['/']);
  }

  bookConsultation(): void {
    this.router.navigate(['/contact-us']);
  }

  callNow(): void {
    window.open('tel:0243115511');
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  hasImage(): boolean {
    return !!this.pageData.image;
  }
}
