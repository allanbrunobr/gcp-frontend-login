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
import {from, map, Observable} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";

@Injectable({
      providedIn: 'root'

})

export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)

  constructor() {
    // Subscribe to onAuthStateChanged to update currentUserSig
    onAuthStateChanged(this.firebaseAuth, (user) => {
      if (user) {
        this.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
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

  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then(() => {});
    return from(promise);
  }

  loginWithGithub(): Observable<void> {
    const provider = new GithubAuthProvider();
    const promise = signInWithPopup(this.firebaseAuth, provider).then(() => {});
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
}
