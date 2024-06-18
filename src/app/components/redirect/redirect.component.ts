import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  standalone: true,
  template: ''
})
export class RedirectComponent implements OnInit {

  ngOnInit(): void {
    window.location.href = 'http://localhost:3001';
  }
}
