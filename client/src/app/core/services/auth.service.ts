import { inject, Injectable, signal } from '@angular/core';
import {
  RegisterReq,
  User,
  UserCredentails,
} from '../../feature/auth/models/auth.model';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private apiService = inject(AuthApiService);

  currentUser = signal<User>(null);

  constructor() {
    this.getCurrentUserFromLocalStorage();
  }

  registerUser(request: RegisterReq) {
    this.apiService.registerUser(request).subscribe({
      next: (data) => {
        console.log('User registered');
        this.router.navigate(['login']);
      },
      error: (error) => console.log(error),
    });
  }

  loginUser(userCredentials: UserCredentails) {
    this.apiService.loginUser(userCredentials).subscribe({
      next: (response) => {
        const token = response.headers.get('access-token');

        console.log(token);
        console.log(response.body);

        this.currentUser.set({ ...response.body, token });

        this.saveCurrentUserToLocalStorage(this.currentUser());

        this.router.navigate(['']);
      },
      error: (error) => console.log(error),
    });
  }

  saveCurrentUserToLocalStorage(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUserFromLocalStorage() {
    const currentUserJSON = localStorage.getItem('currentUser');

    if (!currentUserJSON) return;

    this.currentUser.set(JSON.parse(currentUserJSON));
  }

  logOutUser() {
    this.currentUser.set(null);
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
