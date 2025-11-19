import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // ✅ Big performance boost
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('whyChooseSection', { static: true }) sectionRef!: ElementRef;
  isSectionVisible = false;

  constructor(
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    // ✅ SEO setup
    this.title.setTitle(
      'Expert Hearing Tests & Hearing Aids in Central Coast | Welfast Hearing'
    );

    this.meta.addTags([
      {
        name: 'description',
        content:
          'Welfast Hearing offers professional hearing tests, micro suction ear wax removal, and the latest Bluetooth and rechargeable hearing aids. Audiologist-owned care in Central Coast and Lake Macquarie.',
      },
      {
        name: 'keywords',
        content:
          'Hearing Tests Central Coast, Rechargeable Hearing Aids, Hearing Clinic in Lake Macquarie, Micro suction Ear wax removal, Bluetooth hearing, Hearing wellness experts in Central Coast',
      },
      { property: 'og:title', content: 'Expert Hearing Tests & Hearing Aids in Central Coast | Welfast Hearing' },
      {
        property: 'og:description',
        content:
          'Welfast Hearing offers professional hearing tests, micro suction ear wax removal, and the latest Bluetooth and rechargeable hearing aids.',
      },
      {
        property: 'og:image',
        content:
          'https://welfasthearing.com.au/assets/Banner-images/5.png',
      },
      { property: 'og:url', content: 'https://welfasthearing.com.au/' },
    ]);

    this.setCanonicalUrl('https://welfasthearing.com.au/');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // ✅ Lazy-load the “Why Choose” section when visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.isSectionVisible = true;
        observer.disconnect();
      }
    });

    observer.observe(this.sectionRef.nativeElement);
  }

  private setCanonicalUrl(url: string) {
    let link: HTMLLinkElement =
      document.querySelector("link[rel='canonical']") ||
      document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  contactus() {
    this.router.navigate(['/', 'contact-us']);
  }

  cards = [
    {
      id: 1,
      title: 'Personalized Care',
      slug: 'personalized-care',
      image: '../../../assets/homewhychoosewellfast/image_1.webp',
      fullContent:
        'We are committed to providing personalized and state-of-the-art hearing care and the latest technology...',
      showMore: false,
    },
    {
      id: 2,
      title: 'Informed Choices',
      slug: 'informed-choices',
      image: '../../../assets/homewhychoosewellfast/image_2.webp',
      fullContent:
        'In Welfast Hearing, we believe in informed choices or decisions made by you...',
      showMore: false,
    },
    {
      id: 3,
      title: 'Government Funding & Payment Plans',
      slug: 'government-funding-and-payment-plans',
      image: '../../../assets/homewhychoosewellfast/image_3.webp',
      fullContent:
        'We assist you in availing of government funding/rebates through hearing service programs...',
      showMore: false,
    },
    {
      id: 4,
      title: 'Ongoing After Care',
      slug: 'ongoing-after-care',
      image: '../../../assets/homewhychoosewellfast/image_4.webp',
      fullContent:
        'We believe in long-standing relationships and ongoing aftercare...',
      showMore: false,
    },
    {
      id: 5,
      title: 'Hassle-Free Purchase',
      slug: 'hassle-free-purchase',
      image: '../../../assets/homewhychoosewellfast/image_5.webp',
      fullContent:
        'Purchasing hearing aids is a long-term investment in your hearing and overall wellness...',
      showMore: false,
    },
  ];

  public showmore(card: any) {
    this.router.navigate(['/why-choose-welfast', card.slug], { state: { card } });
  }

  trackByCard(index: number, card: any): number {
    return card.id;
  }

  generateSrcSet(image: string): string {
    const base = image.replace(/\.(jpg|png|webp)$/, '');
    return `${base}.webp 150w, ${base}.webp 300w, ${base}.webp 600w`;
  }
}
