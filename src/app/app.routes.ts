import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import {RedirectComponent} from "./components/redirect/redirect.component";


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'react-app-route', component: RedirectComponent },
];
