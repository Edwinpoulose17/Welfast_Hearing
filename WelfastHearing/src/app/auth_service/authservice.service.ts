import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Single dummy admin credentials
  private adminCredentials = {
    username: 'admin',
    password: 'admin123',
    user: {
      id: 1,
      username: 'admin',
      email: 'admin@welfast.com',
      role: 'admin'
    }
  };
  constructor(private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<{ success: boolean, message?: string }> {
    // Check against single admin credentials
    if (username === this.adminCredentials.username &&
      password === this.adminCredentials.password) {

      // Store user details in localStorage
      localStorage.setItem('currentUser', JSON.stringify(this.adminCredentials.user));
      localStorage.setItem('isLoggedIn', 'true');

      // Update current user
      this.currentUserSubject.next(this.adminCredentials.user);

      return of({ success: true, message: 'Login successful!' });
    } else {
      return of({ success: false, message: 'Invalid username or password' });
    }
  }

  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');

    // Update current user
    this.currentUserSubject.next(null);

    // Navigate to login page
    this.router.navigate(['/Admin-login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true' && !!this.currentUserValue;
  }

  isAdmin(): boolean {
    return this.isAuthenticated(); // Since we only have one admin user
  }

  // Get admin credentials for display
  getAdminCredentials() {
    return {
      username: this.adminCredentials.username,
      password: this.adminCredentials.password
    };
  }
}
