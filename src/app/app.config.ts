import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideFirebaseApp, initializeApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC89iiJs8CLm-cVcSV9gPvsFdeL36qnFHY",
  authDomain: "angular-login-gcp.firebaseapp.com",
  projectId: "angular-login-gcp",
  storageBucket: "angular-login-gcp.appspot.com",
  messagingSenderId: "974000431354",
  appId: "1:974000431354:web:4d319f8c2fc6edff22e943",
  measurementId: "G-523KGLDNRC"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideAuth(() => getAuth())
]),
],
};
