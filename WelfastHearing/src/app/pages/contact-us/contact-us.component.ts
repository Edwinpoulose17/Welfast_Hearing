import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  constructor(private meta: Meta,
    private title: Title) {
    // Set page title
    this.title.setTitle('Contact Welfast Hearing Your Local Hearing Care Experts');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Get in touch with Welfast Hearing for expert hearing tests, micro suction ear wax removal, and hearing aid consultations. Serving Central Coast & Lake Macquarie with audiologist-owned care.'
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Contact Audiologist in Central Coast, Book Hearing Test in Central Coast, Hearing Clinic Central Coast, Contact Hearing Specialist in Central Coast'
    });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Contact Welfast Hearing Your Local Hearing Care Experts' });
    this.meta.updateTag({ property: 'og:description', content: 'Get in touch with Welfast Hearing for expert hearing care in Central Coast & Lake Macquarie.' });
    this.meta.updateTag({ property: 'og:image', content: 'https://welfasthearing.com.au/assets/images/contact-banner.jpg' });
    this.meta.updateTag({ property: 'og:url', content: 'https://welfasthearing.com.au/Contact-us' });

    // Set canonical URL
    this.setCanonicalUrl('https://welfasthearing.com.au/Contact-us');
  }
  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement = document.querySelector("link[rel='canonical']") || document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
}
