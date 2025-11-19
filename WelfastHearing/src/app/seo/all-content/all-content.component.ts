import { CommonModule } from '@angular/common';
import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-content.component.html',
  styleUrl: './all-content.component.css'
})
export class AllContentComponent implements OnInit {
   phoneNumber = '0243115511';
  constructor(
    private meta: Meta,
    private title: Title,
    private navbarService: ServiceService
  ) {
    this.title.setTitle('Complete Hearing Care Guide | Welfast Hearing');

    this.meta.updateTag({
      name: 'description',
      content: 'Complete guide to hearing care services, hearing aids, tinnitus treatment, and ear health. Expert audiologist-led care in Central Coast.'
    });
  }

  ngOnInit(): void {
    // Hide navbar when this component loads
    this.navbarService.hide();
  }

  ngOnDestroy(): void {
    // Show navbar when leaving this component
    this.navbarService.show();
  }

  // Sample data for services
  services = [
    {
      icon: './../../assets/1.svg',
      title: 'Comprehensive Hearing Test',
      description: 'Complete diagnostic hearing assessments using state-of-the-art equipment and techniques.'
    },
    {
      icon: '../../../assets/2.svg',
      title: 'Tinnitus Evaluation',
      description: 'Specialized evaluation and management programs for tinnitus relief and management.'
    },
    {
      icon: '../../../assets/3.svg',
      title: 'Hearing Aids Fitting',
      description: 'Expert fitting and customization of the latest hearing aid technology for your needs.'
    },
    {
      icon: '../../../assets/4.svg',
      title: 'Ear Wax Removal',
      description: 'Safe and professional micro-suction ear wax removal procedures.'
    }
  ];

  // Why Choose Us data
  whyChooseUs = [
    {
      title: 'Personalized Care',
      image: '../../../assets/homewhychoosewellfast/image_1.jpg',
      description: 'We are committed to providing personalized and state-of-the-art hearing care and the latest technology to each and every customer. We help you choose the latest Assistive Listening Devices (ALDs) and hearing aids based on your hearing loss, lifestyle, expectations, and unique listening goals.'
    },
    {
      title: 'Informed Choices',
      image: '../../../assets/homewhychoosewellfast/image_2.jpg',
      description: 'In Welfast Hearing, we believe in informed choices or decisions made by you. No one else knows better than you about your hearing difficulties and their impact on everyday life. Together, through an informed decision-making process, we choose the best hearing solution for you.'
    },
    {
      title: 'Government Funding',
      image: '../../../assets/homewhychoosewellfast/image_3.jpg',
      description: 'We are committed to providing affordable hearing solutions to the community. We assist you in availing of government funding/rebates through the hearing service program, NDIS, DVA, private health funds, and NSW Workers Compensation.'
    },
    {
      title: 'Ongoing After Care',
      image: '../../../assets/homewhychoosewellfast/image_4.jpg',
      description: 'We believe in long-standing relationships and ongoing aftercare. All hearing aids come with a minimum of a 3-year international warranty and annual hearing care consultations.'
    },
    {
      title: 'Hassle-Free Purchase',
      image: '../../../assets/homewhychoosewellfast/image_5.jpg',
      description: 'Purchasing hearing aids is a long-term investment in your hearing and overall wellness. Our commitment-free hearing aid trial and 30-day money-back guarantee ensure a hassle-free purchase experience.'
    }
  ];


   makeCall() {
    window.location.href = `tel:${this.phoneNumber}`;
  }
}


