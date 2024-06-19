import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from "./services/auth.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import {combineLatest, from} from "rxjs";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NavbarComponent, HttpClientModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn = false;

  ngOnInit(): void {
    combineLatest(
      this.authService.onAuthStateChanged(),
      from(this.authService.logout()) // Observable that completes after logout
    ).subscribe(([isLoggedIn]) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe();
  }

  loginWithGithub(): void {
    this.authService.loginWithGithub().subscribe();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('User logged out');
      this.authService.currentUserSig.set(null);
      const urlTree = this.router.createUrlTree(['/login']); // Construct UrlTree
      this.router.navigateByUrl(urlTree).then(r => {});
    }, error => {
      console.error('Logout failed', error);
    });
  }
}
