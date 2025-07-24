// Updated blogs.component.ts
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Blog } from '../../interfaces/blogs';
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
  selectedBlog: any = null; // For custom modal
  showModal = false; // For custom modal

  constructor(
    private blogService: ServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    console.log('Current environment:', environment);
    console.log('API URL:', environment.url);
    if (isPlatformBrowser(this.platformId)) {
    this.getBlogs();
  }
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

  mapImageData() {
    this.mappeddata = this.blogs.map((item: any) => ({
      id: item.id,
      heading: item.heading,
      content: item.content,
      image: environment.url + item.image
    }));
  }

  // Custom modal methods (without body scroll lock)
  openModal(blog: any) {
    this.selectedBlog = blog;
    this.showModal = true;
    this.trackBlogView(blog.id);

    // Only manipulate DOM in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Add ESC key listener
      this.addKeyListener();
    }
  }

  closeModal() {
    this.showModal = false;
    this.selectedBlog = null;

    // Only manipulate DOM in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Remove ESC key listener
      this.removeKeyListener();
    }
  }

  // ESC key support
  private keyListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  private addKeyListener() {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      document.addEventListener('keydown', this.keyListener);
    }
  }

  private removeKeyListener() {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.keyListener);
    }
  }

  ngOnDestroy() {
    // Clean up event listener if component is destroyed
    if (isPlatformBrowser(this.platformId)) {
      this.removeKeyListener();
    }
  }

  // Helper method to calculate reading time
  getReadingTime(content: string): number {
    if (!content) return 1;

    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return readingTime < 1 ? 1 : readingTime;
  }

  // Helper method to truncate content for card preview
  getTruncatedContent(content: string, maxLength: number = 5500): string {
    if (!content) return '';

    // Remove HTML tags if present
    const textContent = content.replace(/<[^>]*>/g, '');

    if (textContent.length <= maxLength) return textContent;

    return textContent.substring(0, maxLength).trim() + '...';
  }

  // Helper method to get author initials
  getAuthorInitials(author?: string): string {
    if (!author) return 'WH';

    return author
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  // Method to handle image loading errors
  onImageError(event: any): void {
    event.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  }

  // Method to format dates
  formatDate(dateString?: string): string {
    if (!dateString) return 'Recent';

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Method to track blog reading analytics
  trackBlogView(blogId: string): void {
    console.log(`Blog ${blogId} viewed`);
  }

  // Method to share blog post
  shareBlog(blog: any): void {
    if (isPlatformBrowser(this.platformId)) {
      if (navigator.share) {
        navigator.share({
          title: blog.heading,
          text: this.getTruncatedContent(blog.content, 100),
          url: window.location.href
        });
      } else if (navigator.clipboard) {
        // Fallback to copying URL to clipboard
        navigator.clipboard.writeText(window.location.href);
        console.log('URL copied to clipboard');
      }
    }
  }
}
