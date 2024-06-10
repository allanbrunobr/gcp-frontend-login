import { Component, Input } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() logout!: () => void;

  handleLogout(): void {
    if (this.logout) {
      this.logout();
    }
  }
}
