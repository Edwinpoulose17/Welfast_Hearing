// detailed-page.component.ts
import { Title } from '@angular/platform-browser';
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

  // Page data from query parameters
  pageData = {
    title: '',
    content: '',
    image: '',
    hasContent: false
  };

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.loadContent();
      this.loading = false;
    }, 800);
  }

  private loadContent(): void {
    // Get query parameters
    this.route.queryParams.subscribe(params => {
      this.pageData.title = params['title'] || '';
      this.pageData.content = params['content'] || '';
      this.pageData.image = params['image'] || '';

      // Check if we have any content to display
      this.pageData.hasContent = !!(this.pageData.title || this.pageData.content);

      // Set browser title
      if (this.pageData.title) {
        this.titleService.setTitle(`${this.pageData.title} - Welfast Hearing`);
      } else {
        this.titleService.setTitle('Welfast Hearing - Details');
      }

      console.log('Page data loaded:', this.pageData);
    });
  }

  // Format content with basic paragraph breaks
  getFormattedContent(): string {
    if (!this.pageData.content) {
      return '<p>No additional details available.</p>';
    }

    // Convert double line breaks to paragraphs
    let formatted = this.pageData.content
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');

    // If no paragraph breaks found, wrap the entire content
    if (!formatted.includes('<p>')) {
      formatted = `<p>${this.pageData.content.replace(/\n/g, '<br>')}</p>`;
    }

    return formatted;
  }

  // Check if page has image
  hasImage(): boolean {
    return !!this.pageData.image;
  }

  // Navigation methods
  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.router.navigate(['/']);
    }
  }

  // Action methods
  bookConsultation(): void {
    this.router.navigate(['/Contact-us']);
  }

  callNow(): void {
    window.open('tel:0243115511');
  }

  navigateHome(): void {
    this.router.navigate(['/']);
  }
}
