import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { authGuard } from './auth.guard';
import {VisionComponent} from "./components/vision/vision.component"; // Importe o guard


export const routes: Routes = [
  { path: 'visionFaceDetection', component: VisionComponent, canActivate: [authGuard]  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainPageComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
];
