import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const authIntercepor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  if (req.url.includes('login') || req.url.includes('register'))
    return next(req);

  if (!authService.currentUser()) return next(req);

  const token = authService.currentUser().token;

  const clonedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(clonedReq);
};
