import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, from } from 'rxjs'; // Import 'from'
import { map } from 'rxjs/operators'; // Import 'map'

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Convert the Promise to an Observable and then use the pipe and map operators
    return from(this.authService.onAuthStateChanged()).pipe(
      map(isLoggedIn => isLoggedIn ? true : this.router.parseUrl('/login'))
    );
  }
}
