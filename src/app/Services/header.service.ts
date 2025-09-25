import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private apiBaseUrl = environment.apiUrl;
    private apiUrl = '/api/Home';

  constructor(private http: HttpClient) { }
   // Fetch home data
    getHomeData(): Observable<any> {
      return this.http.get<any>(`${this.apiBaseUrl}${this.apiUrl}`);
    }
}
