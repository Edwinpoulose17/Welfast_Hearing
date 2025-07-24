import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private router: Router, private meta: Meta, private title: Title,) {
    this.title.setTitle('Expert Hearing Tests & Hearing Aids in Central Coast | Welfast Hearing');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Welfast Hearing offers professional hearing tests, micro suction ear wax removal, and the latest Bluetooth and rechargeable hearing aids. Audiologist-owned care in Central Coast and Lake Macquarie.'
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hearing Tests Central Coast, Rechargeable Hearing Aids, Hearing Clinic in Lake Macquarie, Micro suction Ear wax removal, Bluetooth hearing, Hearing wellness experts in Central Coast'
    });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Expert Hearing Tests & Hearing Aids in Central Coast | Welfast Hearing' });
    this.meta.updateTag({ property: 'og:description', content: 'Welfast Hearing offers professional hearing tests, micro suction ear wax removal, and the latest Bluetooth and rechargeable hearing aids.' });
    this.meta.updateTag({ property: 'og:image', content: '	https://welfasthearing.com.au/assets/Banner-images/5.png' });
    this.meta.updateTag({ property: 'og:url', content: 'https://welfasthearing.com.au/' });

    // Set canonical URL
    this.setCanonicalUrl('https://welfasthearing.com.au/');
  }

  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement = document.querySelector("link[rel='canonical']") || document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
  contactus() {
    this.router.navigate(['/', 'contact-us'])
  }
  cards = [
    {
      title: 'Personalized Care',
      image: '../../../assets/homewhychoosewellfast/image_1.jpg',
      content: 'We provide personalized and state-of-the-art hearing care...',
      fullContent: 'We are committed to providing personalized and state-of-the-art hearing care and the latest technology to each and every customer. We help you choose the latest Assistive Listening Devices (ALDs) and hearing aids based on your hearing loss, lifestyle, expectations, and unique listening goals to be achieved. If you need an invisible hearing aid, a hearing aid that reduces background noise, or one that ensures clarity of speech in challenging environments, we customize your hearing solutions.',
      showMore: false
    },
    {
      title: 'Informed Choices',
      image: '../../../assets/homewhychoosewellfast/image_2.jpg',
      content: 'We believe in informed choices...',
      fullContent: 'In Welfast Hearing, we believe in informed choices or decisions made by you. No one else knows better than you about your hearing difficulties and their impact on everyday life. You are well aware of what you expect from hearing aids and your financial situation. Together, through an informed decision-making process, we choose the best hearing solution for you.',
      showMore: false
    },
    {
      title: 'Government Funding & Payment Plans',
      image: '../../../assets/homewhychoosewellfast/image_3.jpg',
      content: 'We provide affordable hearing solutions...',
      fullContent: 'We are committed to providing affordable hearing solutions to the community. We assist you in availing of government funding/rebates through the hearing service program (for eligible pensioners and veterans), NDIS, DVA, private health funds, and NSW Workers Compensation. We ensure accessible hearing solutions for the community because the community comes first.',
      showMore: false
    },
    {
      title: 'Ongoing After Care',
      image: '../../../assets/homewhychoosewellfast/image_4.jpg',
      content: 'We provide ongoing aftercare and support...',
      fullContent: 'We believe in long-standing relationships and ongoing aftercare. All hearing aids come with a minimum of a 3-year international warranty and annual hearing care consultations. We understand that hearing difficulties and needs can vary over time, so we accommodate those changes in your hearing aids or select the best solution based on your ongoing needs.',
      showMore: false
    },
    {
      title: 'Hassle-Free Purchase',
      image: '../../../assets/homewhychoosewellfast/image_5.jpg',
      content: 'Our 30-day money-back guarantee ensures peace of mind...',
      fullContent: 'Purchasing hearing aids is a long-term investment in your hearing and overall wellness. Our commitment-free hearing aid trial and 30-day money-back guarantee ensure a hassle-free purchase experience.',
      showMore: false
    }
  ];

  toggleContent(card: any) {
    card.showMore = !card.showMore;
  }
  private addStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Welfast Hearing",
      "description": "Professional hearing tests and hearing aids in Central Coast",
      "url": "https://welfasthearing.com.au",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Central Coast",
        "addressRegion": "NSW",
        "addressCountry": "AU"
      },
      "telephone": "+0243115511",
      "priceRange": "$$",
      "serviceArea": "Central Coast, Lake Macquarie"
    });
    document.head.appendChild(script);
  }
}
