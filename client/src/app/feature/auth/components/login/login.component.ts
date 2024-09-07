import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = this.generateLoginForm();

  generateLoginForm() {
    return new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onFormSubmit() {
    this.loginForm.markAllAsTouched();

    if (!this.loginForm.invalid) return;

    console.log(this.loginForm.value);

    this.loginForm.reset();
  }
}
