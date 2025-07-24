import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = environment.url;

  constructor(private http: HttpClient) { }
  private getAuthHeaders() {
    let api_key = "123";
    const ParseHeaders = new HttpHeaders({
      'Authorization': `Bearer ${api_key}`
      // Removed Content-Type for FormData uploads
    });
    return ParseHeaders;
  }
  // For JSON requests (WITH Content-Type)
  private getJsonHeaders() {
    let api_key = "123";
    const ParseHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${api_key}`
    });
    return ParseHeaders;
  }

  // Blogs
  BlogUpload(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders(); // Use FormData headers
    return this.http.post(this.baseUrl + 'blogs_add', formData, { headers });
  }

  get_Blogs(): Observable<any> {
    const headers = this.getJsonHeaders(); // Add auth headers
    return this.http.get(this.baseUrl + 'get_blogs', { headers });
  }

  deleteBlogs(id: any): Observable<any> {
    console.log("Deleting blog with ID:", id);
    const headers = this.getAuthHeaders(); // Add auth headers
    return this.http.post(this.baseUrl + 'remove_blogs', { "id": id }, { headers });
  }

  // Products
  uploadProducts(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders(); // ADD AUTH HEADERS!
    return this.http.post(this.baseUrl + 'products_add', formData, { headers });
  }

  get_Products(): Observable<any> {
    const headers = this.getJsonHeaders(); // Add auth headers
    return this.http.get(this.baseUrl + 'get_products', { headers });
  }

  deleteProducts(id: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Add auth headers
    return this.http.post(this.baseUrl + 'remove_products', { "id": id }, { headers });
  }

  // Services
  uploadServices(formData: FormData): Observable<any> {
    const headers = this.getAuthHeaders(); // ADD AUTH HEADERS!
    return this.http.post(this.baseUrl + 'services_add', formData, { headers });
  }

  get_services(): Observable<any> {
    const headers = this.getJsonHeaders(); // Add auth headers
    return this.http.get(this.baseUrl + 'get_services', { headers });
  }

  deleteServices(id: any): Observable<any> {
    const headers = this.getAuthHeaders(); // Add auth headers
    return this.http.post(this.baseUrl + 'remove_services',  { "id": id }, { headers });
  }
}
