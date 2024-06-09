import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const form = this.form.getRawValue();
    this.authService
      .login(form.email, form.password)
      .subscribe({
        next: () => {
          const urlTree = this.router.createUrlTree(['/']); // Construct UrlTree
          this.router.navigateByUrl(urlTree);
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe({
      next: () => {
        const urlTree = this.router.createUrlTree(['/']);
        this.router.navigateByUrl(urlTree);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

  loginWithGithub(): void {
    this.authService.loginWithGithub().subscribe({
      next: () => {
        const urlTree = this.router.createUrlTree(['/']);
        this.router.navigateByUrl(urlTree);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }
}
