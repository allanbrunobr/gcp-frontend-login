import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authService.user$.subscribe((user: { email: string; displayName: string; }) => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
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
      this.authService.currentUserSig.set(null); // Atualizar o sinal do usuário para null
      const urlTree = this.router.createUrlTree(['/']); // Construct UrlTree
      this.router.navigateByUrl(urlTree);
      }, error => {
      console.error('Logout failed', error);
    });

  }
}
