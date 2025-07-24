import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthserviceService } from '../../auth_service/authservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';
  success = '';
  showPassword = false;
  adminCredentials: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthserviceService
  ) {
    // Redirect to admin dashboard if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin-dashboard']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    // Get return url from route parameters or default to admin dashboard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin-dashboard';

    // Get admin credentials for display
    this.adminCredentials = this.authService.getAdminCredentials();
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = '';

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulate loading delay for better UX
    setTimeout(() => {
      this.authService.login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (response:any) => {
            if (response.success) {
              this.success = response.message || 'Login successful!';
              // Redirect after short delay to show success message
              setTimeout(() => {
                this.router.navigate([this.returnUrl]);
              }, 1000);
            } else {
              this.error = response.message || 'Login failed';
              this.loading = false;
            }
          },
          error: () => {
            this.error = 'An unexpected error occurred. Please try again.';
            this.loading = false;
          }
        });
    }, 1000); // 1 second delay to simulate network request
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Quick login function for demo purposes
  quickLogin(username: string, password: string): void {
    this.loginForm.patchValue({
      username: username,
      password: password
    });
  }

  // Clear form
  clearForm(): void {
    this.loginForm.reset();
    this.submitted = false;
    this.error = '';
    this.success = '';
  }
}
