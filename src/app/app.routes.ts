import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'register', component: RegisterComponent },
];
