import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
    imports: [
        RouterOutlet
    ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  authService = inject(AuthService);

}
