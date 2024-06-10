import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private apiUrl = 'http://localhost:8081/navigation';  // URL base do NavigationController

  constructor(private http: HttpClient) {}

  getRedirectionPath(): Observable<string> {
    return this.http.get<string>(this.apiUrl);
  }
}
