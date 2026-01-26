import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginResponse } from 'src/app/model/interfaces/auth/login.interfaces';
import { DEFAULT_ROUTE_URL } from 'src/app/app.constants';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  message = '';
  isSuccess = false;
  isSubmitting = false;

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.message = '';

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: LoginResponse) => this.handleSuccess(response),
      error: (error) => this.handleError(error),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  private handleSuccess(response: LoginResponse): void {
    this.isSubmitting = false;
    this.isSuccess = true;
    this.message = `Bienvenido! Redirigiendo...`;

    setTimeout(() => {
      this.router.navigate([DEFAULT_ROUTE_URL]);
    }, 1000);
  }

  private handleError(error: unknown): void {
    this.isSubmitting = false;
    this.isSuccess = false;
    this.message = error instanceof Error ? error.message : 'No pudimos iniciar sesión.';
  }
}
