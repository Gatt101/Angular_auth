import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('jwtToken'); // Check for JWT token

  if (token) {
    // Token exists, allow navigation
    return true;
  } else {
    // Token does not exist, redirect to login
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
