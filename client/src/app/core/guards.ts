import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser()) {
    router.navigate(['login']);
    return false;
  }

  return true;
};
