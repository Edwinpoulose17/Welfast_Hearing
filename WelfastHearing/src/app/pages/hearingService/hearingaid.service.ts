import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HearingaidService {

  constructor() { }
  getServices() {
    return [
      {
        title: "Micro Suction Ear Wax Removal",
        image: "../../../assets/hearingService/microsuction.jpeg",
        description: "Micro suction ear wax removal is a safer and more comfortable option compared to syringing.",
        fullText: "Even though ear syringing is common, it can be uncomfortable and messy. Micro suction is a safe, hassle-free alternative that provides instant results.",
        showMore: false,
        subsections: [
          { title: "Benefits of Micro Suction", points: ["No liquid required", "Clean and hygienic", "Instant result", "Comfortable"] }
        ]
      },
      {
        title: "Hearing Test",
        image: "../../../assets/hearingService/hearing test.jpeg",
        description: "Regular hearing tests help detect hearing loss early, especially for those over 50.",
        fullText: "Hearing sensitivity deteriorates over time. We offer free tests for seniors and comprehensive assessments by qualified audiologists.",
        showMore: false,
        subsections: [
          { title: "Free Hearing Test for Seniors", content: "We provide free hearing tests for seniors over 50 to determine if further assessment is required." },
          { title: "Comprehensive Hearing Test", content: "A 60-minute detailed assessment conducted by registered audiologists." },
          { title: "Types of Hearing Tests", points: ["Pure Tone Audiometry", "Tympanometry/Immittance", "Speech Discrimination Test", "Speech in Noise Test", "Video Otoscopy"] }
        ]
      },
      {
        title: "Tinnitus and Hyperacusis Evaluation",
        image: "../../../assets/hearingService/tinitus-evalution.jpeg",
        description: "Specialized assessment and therapy for tinnitus and hyperacusis.",
        fullText: "Tinnitus causes ringing or hissing sounds without an external source. We offer Tinnitus Retraining Therapy (TRT) to manage symptoms effectively.",
        showMore: false,
        subsections: [
          { title: "Hyperacusis", content: "A disorder causing extreme sensitivity to sound, often treated using TRT." }
        ]
      },
      {
        title: "Hearing Aids",
        image: "../../../assets/hearingService/hearingaids.jpeg",
        description: "Personalized hearing aid solutions to suit your lifestyle.",
        fullText: "We provide expert fittings and adjustments to ensure optimal performance. We also offer free hearing aid trials and a 30-day satisfaction period.",
        showMore: false,
        subsections: [
          { title: "Free Hearing Aid Trial", content: "Try hearing aids with a 10-minute test drive and a 30-day trial period." }
        ]
      },
      {
        title: "Hearing Services for Work",
        image: "../../../assets/hearingService/hearingservicework.jpg",
        description: "Work-related hearing assessments for noise exposure.",
        fullText: "Occupational noise exposure can cause temporary or permanent hearing loss. We conduct assessments and provide work cover claims assistance.",
        showMore: false,
        subsections: [
          { title: "Types of Work-Related Hearing Tests", points: ["Pre-Employment Test", "Work Cover Hearing Assessment", "DVA Hearing Assessment", "Work Cover Hearing Claim Lodgement"] }
        ]
      },
      {
        title: "Hearing Assessment for Children (5+ Years)",
        image: "../../../assets/hearingService/children.jpeg",
        description: "Early detection of hearing loss in children is crucial for speech development.",
        fullText: "With a referral from a medical practitioner, we conduct child-friendly hearing assessments to diagnose and manage hearing issues early.",
        showMore: false,
        subsections: [
          { title: "Paediatric Hearing Tests", points: ["Speech Audiometry", "Tympanometry", "Pure Tone Audiometry", "Video Otoscopy"] }
        ]
      },
      {
        title: "Pensioners and Veterans Hearing Services",
        image: "../../../assets/hearingService/pensioners.jpeg",
        description: "Government-funded hearing services for eligible Australians.",
        fullText: "We are an accredited service provider under the Australian Hearing Service Program (HSP), offering assessments, rehabilitation, and hearing devices.",
        showMore: false,
        subsections: [
          { title: "Eligibility Criteria", points: ["Pensioner Concession Card Holder", "DVA Gold/White Card Holder", "Australian Defence Force Member", "Disability Employment Services Referral"] }
        ]
      }
    ];
  }
}
