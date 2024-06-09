import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const form = this.form.getRawValue();
    this.authService
      .register(form.email, form.username, form.password)
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
}
