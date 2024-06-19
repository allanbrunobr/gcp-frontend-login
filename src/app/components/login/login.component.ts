import { HttpClient } from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../services/auth.service";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const reactAddress = '/react-app-route';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule],
})
export class LoginComponent implements OnInit{
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit(): void {
    const form = this.form.getRawValue();
    this.authService
      .login(form.email, form.password)
      .subscribe({
        next: () => {
          const urlTree = this.router.createUrlTree([reactAddress],
            { queryParams: { email: form.email } }); // Add email as query param
          this.router.navigateByUrl(urlTree);
        },
        error: (err) => {
          this.errorMessage = err.code;
        },
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe({
      next: (result) => {
        const urlTree = this.router.createUrlTree([reactAddress],
          { queryParams: { username: result.displayName  } });
        this.router.navigateByUrl(urlTree);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

  loginWithGithub(): void {
    this.authService.loginWithGithub().subscribe({
      next: (result) => {
        const urlTree = this.router.createUrlTree([reactAddress],
                        { queryParams: { username: result.displayName  } });
        this.router.navigateByUrl(urlTree);
      },
      error: (err) => {
        this.errorMessage = err.code;
      },
    });
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
      this.errorMessage = message;
    }
  }
}
