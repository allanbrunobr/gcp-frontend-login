import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class VisionService {
  private apiUrl = 'http://localhost:8081';  // URL base do VisionController

  constructor(private http: HttpClient) {}

  uploadFileToVisionFace(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/uploadFileToVisionFace`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      }),
      observe: 'response'
    }).pipe(
      map((event: HttpResponse<any>) => {
        if (event.type === HttpEventType.Response) {
          return event.body;
        }
        return null;
      })
    );
  }
}
