// Updated blogs.component.ts - NAVIGATION INSTEAD OF MODALS
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router'; // ADDED: For navigation
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit, OnDestroy {
  blogs: any = [];
  loading = true;
  error = '';
  mappeddata: any[] = [];

  // REMOVED: Modal-related properties
  // selectedBlog: any = null;
  // showModal = false;

  // Default meta values
  private defaultTitle = 'WelfastHearing Blog – Insights on micro Suction, Hearing Tests & bluetooth Aids';
  private defaultDescription = 'Explore the Welfast Hearing blog for expert insights on micro suction ear wax removal, hearing tests, hearing-aids, and the latest in rechargeable and Bluetooth-enabled hearing devices.';
  private defaultKeywords = 'Micro suctionear wax removal, Hearing Test,HearingAids,Rechargeable hearing aids, Bluetoothhearing aid';

  constructor(
    private blogService: ServiceService,
    private meta: Meta,
    private titleService: Title,
    private router: Router, // ADDED: Router for navigation
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.setDefaultMetaTags();

    if (isPlatformBrowser(this.platformId)) {
      this.getBlogs();
    }
  }

  setDefaultMetaTags(): void {
    this.titleService.setTitle(this.defaultTitle);
    this.meta.updateTag({ name: 'description', content: this.defaultDescription });
    this.meta.updateTag({ name: 'keywords', content: this.defaultKeywords });

    // Open Graph meta tags
    this.meta.updateTag({ property: 'og:title', content: this.defaultTitle });
    this.meta.updateTag({ property: 'og:description', content: this.defaultDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: this.defaultTitle });
    this.meta.updateTag({ name: 'twitter:description', content: this.defaultDescription });
  }

  getBlogs() {
    this.loading = true;
    this.error = '';

    this.blogService.get_Blogs().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.blogs = res.data;
          this.mapImageData();
        } else {
          this.error = 'Failed to load blogs. Please try again later.';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.error = 'Failed to load blogs. Please try again later.';
        console.error('Error fetching blogs:', err);
      }
    });
  }

  // Clean data mapping with slug generation
  mapImageData() {
    this.mappeddata = this.blogs.map((item: any) => ({
      id: item.id,
      heading: item.heading,
      content: item.content,
      image: environment.url + item.image,
      // Use meta fields if available, fallback to regular fields
      title: item.meta_title || item.title || item.heading,
      metaKeyword: item.meta_keyword || item.metaKeyword || '',
      metaDescription: item.meta_description || item.metaDescription || this.getTruncatedContent(item.content, 160),
      // ADDED: Generate slug for navigation
      slug: this.createSlug(item.meta_title || item.title || item.heading),
      created_at: item.created_at || item.date
    }));

    console.log('Mapped blog data with slugs:', this.mappeddata);
  }

  // ADDED: Create URL-friendly slug
  createSlug(title: string): string {
    if (!title) return 'blog-post';

    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  // Get blog title (meta title or fallback)
  getBlogTitle(blog: any): string {
    return blog.title || blog.heading || 'Untitled Blog Post';
  }

  // Get SEO description (meta description or fallback)
  getSEODescription(blog: any): string {
    if (blog.metaDescription && blog.metaDescription !== this.getTruncatedContent(blog.content, 160)) {
      return blog.metaDescription;
    }
    return this.getTruncatedContent(blog.content, 150);
  }

  // UPDATED: Navigate to blog detail instead of opening modal
  viewBlogPost(blog: any): void {
    // Track the view for analytics
    this.trackBlogView(blog.id);

    // Navigate to the individual blog post page
    this.router.navigate(['/blog', blog.slug]);
  }

  // REMOVED: All modal-related methods
  // openModal(), closeModal(), updateBlogMetaTags(), keyListener, etc.

  // Calculate reading time
  getReadingTime(content: string): number {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime < 1 ? 1 : readingTime;
  }

  // Truncate content for previews
  getTruncatedContent(content: string, maxLength: number = 150): string {
    if (!content) return '';

    // For very short content, return as-is
    if (content.length <= maxLength) return content;

    // Remove HTML tags for text-only excerpts
    const textContent = content.replace(/<[^>]*>/g, '');

    if (textContent.length <= maxLength) return textContent;

    return textContent.substring(0, maxLength).trim() + '...';
  }

  // Get author initials
  getAuthorInitials(author?: string): string {
    if (!author) return 'WH';
    return author
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Handle image loading errors
  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  }

  // Track blog views for analytics
  trackBlogView(blogId: string): void {
    console.log(`Blog ${blogId} viewed`);
    // You can add Google Analytics or other tracking here
  }

  // UPDATED: Simple share functionality for the listing page
  shareBlogList(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;
      const title = this.defaultTitle;
      const description = this.defaultDescription;

      if (navigator.share) {
        navigator.share({ title, text: description, url });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        console.log('URL copied to clipboard');
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up if needed
    this.setDefaultMetaTags();
  }
}
