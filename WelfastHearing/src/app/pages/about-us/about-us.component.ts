import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

  constructor(private router: Router, private meta: Meta, private title: Title) {
    this.title.setTitle('Welfast Hearing – Experts in Micro Suction Ear Wax Removal, Hearing Tests & Bluetooth Hearing Aids');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Based in the CentralCoast & LakeMacquarie, Welfast Hearing offers expert hearing tests micro suction earwax removal, and advanced hearing aids — including rechargeable & Bluetooth-enableddevices — withpersonalised care.'
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'Micro suctionear wax removal, Hearing Test,HearingAids,Rechargeable hearing aids, Bluetoothhearing aid'
    });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Welfast Hearing – Experts in Micro Suction Ear Wax Removal, Hearing Tests & Bluetooth Hearing Aids' });
    this.meta.updateTag({ property: 'og:description', content: 'Based in the CentralCoast & LakeMacquarie, Welfast Hearing offers expert hearing tests micro suction earwax removal, and advanced hearing aids — including rechargeable & Bluetooth-enableddevices — withpersonalised care.' });
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
  services = [
    {
      icon: 'fas fa-stethoscope',
      title: 'Comprehensive Testing',
      description: 'Complete hearing assessments using the latest technology'
    },
    {
      icon: 'fas fa-assistive-listening-systems',
      title: 'Modern Hearing Aids',
      description: 'Rechargeable and Bluetooth-enabled devices'
    },
    {
      icon: 'fas fa-user-md',
      title: 'Personalized Care',
      description: 'Tailored solutions for your unique lifestyle'
    }
  ];

  stats = [
    {
      number: '5-7',
      description: 'Years average hearing aid lifespan'
    },
    {
      number: '100%',
      description: 'Independent recommendations'
    },
    {
      number: '24/7',
      description: 'Ongoing support available'
    }
  ];

  onBookAppointment(): void {
    // Handle appointment booking logic here
    console.log('Book appointment clicked');
  }
}
