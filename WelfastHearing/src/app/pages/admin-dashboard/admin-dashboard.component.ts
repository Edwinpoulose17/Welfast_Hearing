import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
 // ADDED: ViewChild for text editor
 @ViewChild('contentEditor') contentEditor!: ElementRef;

  uploadForm!: FormGroup;
  imagePreview: string | null = null;
  file: File | null = null;
  submitted = false;
  loading = false;
  activeTab: string = 'Upload Blogs';

  message = '';

  mappeddata: any[] = [];
  imagedata: any[] = [];

  productCategories = [
    { value: 'hearing-a', label: 'Hearing Aids' },
    { value: 'hearing-b', label: 'Hearing Aid Accessories' },
    { value: 'hearing-c', label: 'Assistive Listening Devices' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // ADDED for SSR safety
  ) {}

  ngOnInit() {
    this.initForm();
    this.getDataByTab();
  }

  initForm() {
    this.uploadForm = this.formBuilder.group({
      img: [null, Validators.required],
      content: ['', Validators.required],
      heading: ['', Validators.required],
      type: ['']
    });
  }

  get f() {
    return this.uploadForm.controls;
  }

  get isProductTab(): boolean {
    return this.activeTab === 'Upload Products';
  }

  uploadImage(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result as string;
      reader.readAsDataURL(this.file);
      this.uploadForm.patchValue({ img: this.file });
    }
  }

  ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId) && this.contentEditor) {
    // Set initial content if exists
    const initialContent = this.uploadForm.get('content')?.value;
    if (initialContent) {
      this.contentEditor.nativeElement.innerHTML = initialContent;
    }
  }
}

// SSR-SAFE TEXT EDITOR METHODS - FIXED
formatText(command: string): void {
  if (isPlatformBrowser(this.platformId)) {
    try {
      // Save current cursor position
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      document.execCommand(command, false, undefined);

      // Restore focus and update content
      if (this.contentEditor) {
        this.contentEditor.nativeElement.focus();
      }

      // Update form content after formatting
      setTimeout(() => this.updateFormContent(), 10);
    } catch (error) {
      console.warn('Text formatting not supported:', error);
    }
  }
}

insertList(listType: 'ul' | 'ol'): void {
  if (isPlatformBrowser(this.platformId)) {
    try {
      const command = listType === 'ul' ? 'insertUnorderedList' : 'insertOrderedList';
      document.execCommand(command, false, undefined);

      if (this.contentEditor) {
        this.contentEditor.nativeElement.focus();
      }

      setTimeout(() => this.updateFormContent(), 10);
    } catch (error) {
      console.warn('List insertion not supported:', error);
    }
  }
}

onContentChange(event: any): void {
  // Debounce the update to avoid too many calls
  if (this.updateTimeout) {
    clearTimeout(this.updateTimeout);
  }

  this.updateTimeout = setTimeout(() => {
    this.updateFormContent();
  }, 100);
}

private updateTimeout: any;

updateFormContent(): void {
  if (isPlatformBrowser(this.platformId) && this.contentEditor) {
    try {
      const htmlContent = this.contentEditor.nativeElement.innerHTML;
      const cleanedContent = this.cleanHtmlContent(htmlContent);

      // Only update if content actually changed
      const currentValue = this.uploadForm.get('content')?.value;
      if (currentValue !== cleanedContent) {
        this.uploadForm.get('content')?.setValue(cleanedContent, { emitEvent: false });
      }
    } catch (error) {
      console.warn('Could not update form content:', error);
    }
  }
}
getTruncatedContent(content: string, maxLength: number = 150): string {
    if (!content) return '';

    // Remove HTML tags if present
    const textContent = content.replace(/<[^>]*>/g, '');

    if (textContent.length <= maxLength) return textContent;

    return textContent.substring(0, maxLength).trim() + '...';
  }

// REMOVED getEditorContent() method - no longer needed

getContentLength(): number {
  if (isPlatformBrowser(this.platformId) && this.contentEditor) {
    try {
      const textContent = this.contentEditor.nativeElement.textContent || '';
      return textContent.trim().length;
    } catch (error) {
      return 0;
    }
  }

  // Fallback: count from form value
  const formContent = this.uploadForm.get('content')?.value || '';
  return formContent.replace(/<[^>]*>/g, '').length;
}

cleanHtmlContent(html: string): string {
  if (!html) return '';

  return html
    // Remove empty paragraphs and divs
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><\/p>/g, '')
    .replace(/<div><br><\/div>/g, '')
    .replace(/<div><\/div>/g, '')
    // Remove leading/trailing breaks
    .replace(/^(<br\s*\/?>)+|(<br\s*\/?>)+$/g, '')
    // Clean up multiple breaks
    .replace(/(<br\s*\/?>){3,}/g, '<br><br>')
    .trim();
}

clearEditor(): void {
  if (isPlatformBrowser(this.platformId) && this.contentEditor) {
    try {
      this.contentEditor.nativeElement.innerHTML = '';
      this.uploadForm.get('content')?.setValue('');
    } catch (error) {
      console.warn('Could not clear editor:', error);
    }
  }
}

// UPDATED: Better form reset
resetForm() {
  this.uploadForm.reset();
  this.imagePreview = null;
  this.file = null;
  this.submitted = false;
  this.message = '';

  // Clear editor content
  this.clearEditor();

  if (isPlatformBrowser(this.platformId)) {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    // Clear any pending timeouts
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
  }
}

  onSubmit() {
    this.submitted = true;
    this.message = '';

    // Update content from editor before validation (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.updateFormContent();
    }

    // Basic validation
    if (!this.file || !this.uploadForm.get('heading')?.value || !this.uploadForm.get('content')?.value) {
      this.message = 'Please fill all fields and select an image';
      return;
    }

    // Additional validation for products
    if (this.isProductTab && !this.uploadForm.get('type')?.value) {
      this.message = 'Please select a product type';
      return;
    }

    const formData = new FormData();
    formData.append('img', this.file);
    formData.append('content', this.uploadForm.get('content')?.value);
    formData.append('heading', this.uploadForm.get('heading')?.value);

    if (this.isProductTab) {
      formData.append('type', this.uploadForm.get('type')?.value);
      console.log('Adding product type:', this.uploadForm.get('type')?.value);
    }

    this.loading = true;
    this.message = 'Uploading...';

    let uploadCall;
    if (this.activeTab === 'Upload Blogs') uploadCall = this.service.BlogUpload(formData);
    else if (this.activeTab === 'Upload Products') uploadCall = this.service.uploadProducts(formData);
    else uploadCall = this.service.uploadServices(formData);

    uploadCall.subscribe(
      (res: any) => {
        this.loading = false;
        console.log('Response:', res);

        if (res.success || res.status) {
          this.message = '✅ Upload successful!';
          this.resetForm();
          this.getDataByTab();
        } else {
          this.message = '❌ Upload failed: ' + (res.message || 'Unknown error');
        }
      },
      (error: any) => {
        this.loading = false;
        console.error('Error:', error);
        this.message = '❌ Upload failed: ' + (error.error?.message || error.message || 'Network error');
      }
    );
  }

  deleteimg(data: any) {
    console.log('Delete data:', data);
    if (!confirm('Delete this item?')) return;

    const formData = data.id;

    this.loading = true;
    let deleteCall;
    if (this.activeTab === 'Upload Blogs') deleteCall = this.service.deleteBlogs(formData);
    else if (this.activeTab === 'Upload Products') deleteCall = this.service.deleteProducts(formData);
    else deleteCall = this.service.deleteServices(formData);

    deleteCall.subscribe(
      (res: any) => {
        this.loading = false;
        if (res.success || res.status) {
          this.message = '✅ Deleted successfully!';
          this.getDataByTab();
        } else {
          this.message = '❌ Delete failed';
        }
      },
      (error: any) => {
        this.loading = false;
        this.message = '❌ Delete failed: ' + error.message;
      }
    );
  }

  getDataByTab() {
    this.loading = true;
    this.message = '';

    let dataCall;
    if (this.activeTab === 'Upload Blogs') dataCall = this.service.get_Blogs();
    else if (this.activeTab === 'Upload Products') dataCall = this.service.get_Products();
    else dataCall = this.service.get_services();

    dataCall.subscribe(
      (res: any) => {
        this.loading = false;
        if (res.success && res.data) {
          this.imagedata = res.data;
          this.mappeddata = this.imagedata.map(item => ({
            id: item.id,
            heading: item.heading,
            content: item.content,
            type: item.type || '',
            image: environment.url + item.image
          }));
        }
      },
      (error: any) => {
        this.loading = false;
        console.error('Get data error:', error);
      }
    );
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    this.resetForm();
    this.getDataByTab();
  }



  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/']);
  }

  getTypeLabel(typeValue: string): string {
    const type = this.productCategories.find(cat => cat.value === typeValue);
    return type ? type.label : typeValue;
  }
}


