import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../auth_service/authservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the required services
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  // Check if user is authenticated
  if (authService.isAuthenticated()) {
    // User is logged in, allow access
    return true;
  } else {
    // User is not logged in, redirect to login page
    // Also pass the current URL so we can redirect back after login
    router.navigate(['/Admin-login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
};
