import {inject, Injectable, signal} from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  updateProfile,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider, onAuthStateChanged
} from "@angular/fire/auth";
import {from, map, Observable, of, tap} from "rxjs";
import { switchMap } from 'rxjs/operators';
import {UserInterface} from "../interfaces/user.interface";
import { Router } from '@angular/router';

@Injectable({
      providedIn: 'root'

})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  constructor(private router: Router) {
    // Subscribe to onAuthStateChanged to update currentUserSig
    onAuthStateChanged(this.firebaseAuth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken(); // Get Firebase ID token
        const userData = {
          isLoggedIn: true,
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        };
        console.log(userData);
        localStorage.setItem('userData', JSON.stringify(userData)); // Store in localStorage
        const url = new URL('http://localhost:3001'); // URL of your React app
        url.searchParams.set('username', user.displayName || '');
        url.searchParams.set('email', user.email || '');
        window.location.href = url.toString();
       // await this.router.navigate(['/react-app-route']);

      } else {
        this.currentUserSig.set(null);
      }
    });
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise =
      createUserWithEmailAndPassword(this.firebaseAuth, email, password)
        .then(response => updateProfile(response.user, {displayName: username}))
    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
      ).then(() => {});
    return from(promise)
  }

  loginWithGoogle(): Observable<{ email: string | null, displayName: string | null }> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then((result) => {
      return { email: result.user.email, displayName: result.user.displayName };
    });
    return from(promise);
  }

  loginWithGithub(): Observable<{ email: string | null, displayName: string | null }> {
    const provider = new GithubAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then((result) => {
      return { email: result.user.email, displayName: result.user.displayName };
    });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  onAuthStateChanged(): Observable<boolean> {
    return new Observable(subscriber => {
      const unsubscribe = onAuthStateChanged(this.firebaseAuth, (user) => {
        if (user) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
      });

      return () => unsubscribe();
    });
  }

  getCurrentUsername(): string | null {
    return this.currentUserSig()?.username || null;
  }
}
