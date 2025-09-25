import { ContactUsComponent } from './../Pages/contact-us/contact-us.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsComponentService {
  private apiBaseUrl = environment.apiUrl;
  private apiUrl = '/api/Message';

  constructor(private http: HttpClient) {}
  // Submit contact form message
  submitMessage(messageData: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}${this.apiUrl}`, messageData);
  }
}
