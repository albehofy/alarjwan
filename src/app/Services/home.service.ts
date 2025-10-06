import { ContactUsComponent } from '../Pages/contact-us/contact-us.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeComponentService {
  private apiBaseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  // get Home data
  getHomeData(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/Home`);
  }
  
  getSiteSetting(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/api/SiteSettings`);
  }
}
