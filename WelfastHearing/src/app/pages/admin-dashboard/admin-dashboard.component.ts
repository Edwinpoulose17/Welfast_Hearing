// admin-dashboard.component.ts - WITH EDIT FUNCTIONALITY
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
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  @ViewChild('contentTextarea') contentTextarea!: ElementRef;

  uploadForm!: FormGroup;
  imagePreview: string | null = null;
  file: File | null = null;
  submitted = false;
  loading = false;
  activeTab: string = 'Upload Blogs';
  showPreview = false;

  // Edit mode properties
  isEditMode = false;
  editingItem: any = null;

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
    @Inject(PLATFORM_ID) private platformId: Object
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
      type: [''],
      // SEO fields for blogs
      title: ['', Validators.required],
      metaKeyword: ['', Validators.required],
      metaDescription: ['', [Validators.required, Validators.maxLength(160)]]
    });
  }

  get f() {
    return this.uploadForm.controls;
  }

  get isProductTab(): boolean {
    return this.activeTab === 'Upload Products';
  }

  get isBlogTab(): boolean {
    return this.activeTab === 'Upload Blogs';
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

  // 🎯 FIELD POPULATION CODE - This runs when Edit button is clicked
  editItem(item: any): void {
    console.log('Editing item:', item); // Debug log

    // Set edit mode
    this.isEditMode = true;
    this.editingItem = item;
    this.message = '';

    // 📝 POPULATE FORM FIELDS WITH EXISTING DATA
    this.uploadForm.patchValue({
      heading: item.heading,           // ← Populates heading field
      content: item.content,           // ← Populates content textarea
      type: item.type || '',          // ← Populates product type dropdown
      title: item.title || '',        // ← Populates SEO title (blogs only)
      metaKeyword: item.metaKeyword || '',      // ← Populates meta keywords (blogs only)
      metaDescription: item.metaDescription || '' // ← Populates meta description (blogs only)
    });

    // 🖼️ SET IMAGE PREVIEW to show current image
    this.imagePreview = item.image;
    this.file = null; // Clear file input since we're showing existing image

    // 🔧 REMOVE image requirement for edit mode (since image already exists)
    this.uploadForm.get('img')?.clearValidators();
    this.uploadForm.get('img')?.updateValueAndValidity();

    // 📜 SCROLL TO FORM for better user experience
    if (isPlatformBrowser(this.platformId)) {
      const formElement = document.querySelector('form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // NEW: Cancel edit mode
  cancelEdit(): void {
    this.isEditMode = false;
    this.editingItem = null;
    this.resetForm();
  }

  // Simple text insertion for textarea
  insertText(startTag: string, endTag: string = ''): void {
    if (isPlatformBrowser(this.platformId) && this.contentTextarea) {
      const textarea = this.contentTextarea.nativeElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      const textToWrap = selectedText || 'text';
      const newText = startTag + textToWrap + endTag;

      const before = textarea.value.substring(0, start);
      const after = textarea.value.substring(end);

      const fullText = before + newText + after;

      this.uploadForm.get('content')?.setValue(fullText);

      setTimeout(() => {
        const newCursorPos = start + newText.length;
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  }

  insertLink(): void {
    if (isPlatformBrowser(this.platformId) && this.contentTextarea) {
      const textarea = this.contentTextarea.nativeElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      const url = prompt('Enter the URL:', 'https://');

      if (url && url.trim()) {
        const linkText = selectedText || 'Click here';
        const linkHTML = `<a href="${url.trim()}" target="_blank">${linkText}</a>`;

        const before = textarea.value.substring(0, start);
        const after = textarea.value.substring(end);

        const fullText = before + linkHTML + after;

        this.uploadForm.get('content')?.setValue(fullText);

        setTimeout(() => {
          const newCursorPos = start + linkHTML.length;
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      }
    }
  }

  insertList(type: 'bullet' | 'number'): void {
    if (isPlatformBrowser(this.platformId) && this.contentTextarea) {
      const textarea = this.contentTextarea.nativeElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      let listItems: string;

      if (selectedText) {
        const lines = selectedText.split('\n').filter((line: any) => line.trim());
        if (type === 'bullet') {
          listItems = '<ul>\n' + lines.map((line: any) => `  <li>${line.trim()}</li>`).join('\n') + '\n</ul>';
        } else {
          listItems = '<ol>\n' + lines.map((line: any) => `  <li>${line.trim()}</li>`).join('\n') + '\n</ol>';
        }
      } else {
        if (type === 'bullet') {
          listItems = '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>';
        } else {
          listItems = '<ol>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ol>';
        }
      }

      const before = textarea.value.substring(0, start);
      const after = textarea.value.substring(end);

      const fullText = before + '\n' + listItems + '\n' + after;

      this.uploadForm.get('content')?.setValue(fullText);

      setTimeout(() => {
        textarea.focus();
        const newPos = start + listItems.length + 2;
        textarea.setSelectionRange(newPos, newPos);
      }, 0);
    }
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  getContentLength(): number {
    return this.f['content'].value?.length || 0;
  }

  getTruncatedContent(content: string, maxLength: number = 150): string {
    if (!content) return '';

    const textContent = content.replace(/<[^>]*>/g, '');

    if (textContent.length <= maxLength) return content;

    return textContent.substring(0, maxLength).trim() + '...';
  }

  resetForm() {
    this.uploadForm.reset();
    this.imagePreview = null;
    this.file = null;
    this.submitted = false;
    this.message = '';
    this.showPreview = false;
    this.isEditMode = false;
    this.editingItem = null;

    // Reset img validator to required for new uploads
    this.uploadForm.get('img')?.setValidators([Validators.required]);
    this.uploadForm.get('img')?.updateValueAndValidity();

    if (isPlatformBrowser(this.platformId)) {
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  }

  onSubmit() {
    this.submitted = true;
    this.message = '';

    // Basic validation for all tabs
    if (!this.isEditMode && !this.file) {
      this.message = '❌ Please select an image';
      return;
    }

    if (!this.uploadForm.get('heading')?.value || !this.uploadForm.get('content')?.value) {
      this.message = '❌ Please fill all required fields';
      return;
    }

    // Additional validation for blogs
    if (this.isBlogTab) {
      if (!this.uploadForm.get('title')?.value ||
          !this.uploadForm.get('metaKeyword')?.value ||
          !this.uploadForm.get('metaDescription')?.value) {
        this.message = '❌ Please fill all blog SEO fields';
        return;
      }
    }

    // Additional validation for products
    if (this.isProductTab && !this.uploadForm.get('type')?.value) {
      this.message = '❌ Please select a product type';
      return;
    }

    const formData = new FormData();

    // Add image only if a new one is selected, or if we're creating (not editing)
    if (this.file) {
      formData.append('img', this.file);
    }

    formData.append('content', this.uploadForm.get('content')?.value);
    formData.append('heading', this.uploadForm.get('heading')?.value);

    // Add ID for edit mode
    if (this.isEditMode && this.editingItem) {
      formData.append('id', this.editingItem.id.toString());
    }
console.log('Form Data ID:', this.uploadForm.get('metaDescription')?.value);
    // Add blog-specific fields
    if (this.isBlogTab) {
      formData.append('meta_title', this.uploadForm.get('title')?.value);
      formData.append('meta_keyword', this.uploadForm.get('metaKeyword')?.value);
      formData.append('meta_description', this.uploadForm.get('metaDescription')?.value);
    }

    if (this.isProductTab) {
      formData.append('type', this.uploadForm.get('type')?.value);
    }

    this.loading = true;
    this.message = this.isEditMode ? 'Updating...' : 'Uploading...';

    let submitCall;

    if (this.isEditMode) {
      // UPDATE operations
      if (this.activeTab === 'Upload Blogs') submitCall = this.service.editBlog(formData);
      else if (this.activeTab === 'Upload Products') submitCall = this.service.uploadProducts(formData);
      else submitCall = this.service.uploadServices  (formData);
    } else {
      // CREATE operations
      if (this.activeTab === 'Upload Blogs') submitCall = this.service.BlogUpload(formData);
      else if (this.activeTab === 'Upload Products') submitCall = this.service.uploadProducts(formData);
      else submitCall = this.service.uploadServices(formData);
    }

    submitCall.subscribe(
      (res: any) => {
        this.loading = false;
        console.log(`${this.isEditMode ? 'Update' : 'Upload'} response:`, res);

        if (res.success || res.status) {
          this.message = this.isEditMode ? '✅ Updated successfully!' : '✅ Upload successful!';
          this.resetForm();
          this.getDataByTab();
        } else {
          this.message = `❌ ${this.isEditMode ? 'Update' : 'Upload'} failed: ` + (res.message || 'Unknown error');
        }
      },
      (error: any) => {
        this.loading = false;
        console.error(`${this.isEditMode ? 'Update' : 'Upload'} error:`, error);
        this.message = `❌ ${this.isEditMode ? 'Update' : 'Upload'} failed: ` + (error.error?.message || error.message || 'Network error');
      }
    );
  }

  deleteimg(data: any) {
    console.log('Delete data:', data);
    if (!confirm('Are you sure you want to delete this item?')) return;

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

          // If we were editing the deleted item, exit edit mode
          if (this.isEditMode && this.editingItem?.id === data.id) {
            this.cancelEdit();
          }

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
        console.log('Get data response:', res);

        if (res.success && res.data) {
          this.imagedata = res.data;
          console.log( this.imagedata)

          this.mappeddata = this.imagedata.map(item => ({
            id: item.id,
            heading: item.heading,
            content: item.content,
            type: item.type || '',
            image: environment.url + item.image,
            title: item.meta_title || item.title || '',
            metaKeyword: item.meta_keyword || item.metaKeyword || '',
            metaDescription: item.meta_desc || item.meta_desc || ''
          }));

          console.log('Mapped data:', this.mappeddata);
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
    this.resetForm(); // This will also exit edit mode
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
