import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent {
blog: any = null;
  loading = true;
  error = '';
  slug = '';

  // Default meta values
  private defaultTitle = 'Our Blog - Wellfast Health';
  private defaultDescription = 'Discover insights, stories, and expert knowledge from Wellfast Health';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: ServiceService,
    private meta: Meta,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Get the slug from the route
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      if (this.slug) {
        this.loadBlogBySlug(this.slug);
      } else {
        this.error = 'No blog post specified';
        this.loading = false;
      }
    });
  }

  loadBlogBySlug(slug: string): void {
    this.loading = true;
    this.error = '';

    // First, get all blogs and find the one with matching slug
    this.blogService.get_Blogs().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.data) {
          // Map the data and create slugs
          const mappedBlogs = res.data.map((item: any) => ({
            ...item,
            image: environment.url + item.image,
            title: item.meta_title || item.title || item.heading,
            metaKeyword: item.meta_keyword || item.metaKeyword || '',
            metaDescription: item.meta_description || item.metaDescription || '',
            slug: this.createSlug(item.meta_title || item.title || item.heading)
          }));

          // Find the blog with matching slug
          const foundBlog = mappedBlogs.find((blog:any) => blog.slug === slug);

          if (foundBlog) {
            this.blog = foundBlog;
            this.updateMetaTags();
          } else {
            this.error = 'Blog post not found';
          }
        } else {
          this.error = 'Failed to load blog post';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load blog post. Please try again later.';
        console.error('Error loading blog:', err);
      }
    });
  }

  createSlug(title: string): string {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  getBlogTitle(blog: any): string {
    return blog.title || blog.heading || 'Blog Post';
  }

  getKeywordTags(keywords: string): string[] {
    if (!keywords) return [];
    return keywords
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0);
  }

  getReadingTime(content: string): number {
    if (!content) return 1;
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime < 1 ? 1 : readingTime;
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  sanitizeContent(content: string): string {
    if (!content) return '';
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .trim();
  }

  updateMetaTags(): void {
    if (!this.blog) return;

    const title = this.getBlogTitle(this.blog);
    const description = this.blog.metaDescription || this.defaultDescription;
    const keywords = this.blog.metaKeyword || 'health, wellness, medical';
    const imageUrl = this.blog.image;
    const url = isPlatformBrowser(this.platformId) ? window.location.href : '';

    // Update basic meta tags
    this.titleService.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Open Graph tags for social sharing
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'article' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    console.log('Meta tags updated for blog:', { title, description, keywords });
  }

  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  }

  goBackToBlogs(): void {
    this.router.navigate(['/Blogs']);
  }

  shareBlog(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = window.location.href;
      const title = this.getBlogTitle(this.blog);
      const text = this.blog.metaDescription || '';

      if (navigator.share) {
        navigator.share({ title, text, url });
      } else {
        this.copyLink();
      }
    }
  }

  shareOnFacebook(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    }
  }

  shareOnTwitter(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(this.getBlogTitle(this.blog));
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  }

  shareOnLinkedIn(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  }

  copyLink(): void {
    if (isPlatformBrowser(this.platformId) && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        console.log('Link copied to clipboard');
        // You could add a toast notification here
      });
    }
  }

  ngOnDestroy(): void {
    // Reset meta tags when leaving the page
    this.titleService.setTitle(this.defaultTitle);
    this.meta.updateTag({ name: 'description', content: this.defaultDescription });
  }
}

