import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FAQComponent {

  constructor(private router: Router, private meta: Meta, private title: Title) {
    this.title.setTitle('WelfastHearingFAQ–MicrSctionEarWaxRemoval, Hearing Tests & Hearing Aids');

    // Set meta description
    this.meta.updateTag({
      name: 'description',
      content: 'Findanswerstocommonquestionsonmirouctionearwaxreval, hearing tests, andvancedhearingaids. learn more about rechargeablehearingaids and Bluetoothhearingaid options at WelfastHearing, Central Coast.'
    });

    // Set keywords
    this.meta.updateTag({
      name: 'keywords',
      content: 'MicrosuctionEarwaxremoval , HearingTest,HearingAids,Rechargeabl e hearing aids'
    });

    // Set Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'WelfastHearing FAQ–MicrSctionEarWaxRemoval, Hearing Tests & Hearing Aids' });
    this.meta.updateTag({ property: 'og:description', content: 'Findanswerstocommonquestionsonmirouctionearwaxreval, hearing tests, andvancedhearingaids. learn more about rechargeablehearingaids and Bluetoothhearingaid options at WelfastHearing, Central Coast.' });
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


  faqItems: any[] = [
    {
      question: "How is Welfast Hearing different from large hearing aid chains?",
      answer: "Unlike big corporate clinics, Welfast Hearing is an independent, locally focused provider. We're not tied to one manufacturer, so we recommend the best hearing aid for your needs—not what we're told to sell. You'll always receive personalised care with us.",
      isOpen: false
    },
    {
      question: "Is micro-suction safe for children and seniors?",
      answer: "Yes. Micro-suction ear wax removal is safe for all ages, including children and older adults. It's gentle, precise, and performed under direct vision, making it one of the safest methods available.",
      isOpen: false
    },
    {
      question: "How long do modern hearing aids last?",
      answer: "With proper care, today's digital hearing aids last between 5 to 7 years. At Welfast Hearing, we also provide ongoing maintenance and adjustments to extend their lifespan and keep performance at its best.",
      isOpen: false
    },
    {
      question: "Do untreated hearing problems affect brain health?",
      answer: "Research shows that untreated hearing loss can increase the risk of cognitive decline and social isolation. By treating hearing loss early with hearing aids or ear care, you can protect both your hearing and overall well-being.",
      isOpen: false
    },
    {
      question: "How soon will I notice a difference after getting hearing aids?",
      answer: "Most people notice an immediate improvement, especially with clarity of speech. However, your brain may take a few weeks to adjust to new sounds. We provide follow-up appointments to fine-tune your device for the best results.",
      isOpen: false
    }
  ];

  toggleFAQ(index: number): void {
    // Close all other FAQ items
    this.faqItems.forEach((item, i) => {
      if (i !== index) {
        item.isOpen = false;
      }
    });

    // Toggle current FAQ item
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }
}
