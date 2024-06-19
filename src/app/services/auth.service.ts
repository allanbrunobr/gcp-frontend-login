import { inject, Injectable, signal } from "@angular/core";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged
} from "@angular/fire/auth";
import { from, Observable } from "rxjs";
import { UserInterface } from "../interfaces/user.interface";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
      providedIn: 'root'

})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)
  private backendUrl = 'http://localhost:8080'; // URL do seu backend Spring Boot

  constructor(private router: Router, private http: HttpClient) {
    // Subscribe to onAuthStateChanged to update currentUserSig
    onAuthStateChanged(this.firebaseAuth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken(); // Get Firebase ID token
        this.generateJwt(idToken).subscribe(response => {
          const jwt = response.token;
          sessionStorage.setItem('token', jwt);
          //this.router.navigate(['/react-app-route']);
          const url = new URL('http://localhost:3001/'); // URL of your React app
          url.searchParams.set('token', jwt);
          window.location.href = url.toString();
        });
       //  const idToken = await user.getIdToken(); // Get Firebase ID token
       //  const userData = {
       //    isLoggedIn: true,
       //    uid: user.uid,
       //    email: user.email,
       //    displayName: user.displayName,
       //  };
       //  console.log(userData);
       //  sessionStorage.setItem('userData', JSON.stringify({ username: user.displayName, email: user.email }));
       //  const url = new URL('http://localhost:3001'); // URL of your React app
       //  url.searchParams.set('username', user.displayName || '');
       //  url.searchParams.set('email', user.email || '');
       //  window.location.href = url.toString();
       // // await this.router.navigate(['/react-app-route']);
      } else {
        this.currentUserSig.set(null);
      }
    });
  }

  generateJwt(firebaseToken: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.backendUrl}/generateJwt`, { firebaseToken });
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
