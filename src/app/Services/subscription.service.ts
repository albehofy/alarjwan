import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private apiBaseUrl = environment.apiUrl;
  private apiUrl = '/api/Packages';
  

  constructor(private http: HttpClient) {}

  // Fetch all packages
  getAllPackages(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}${this.apiUrl}`);
  }

  getPackageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}${this.apiUrl}/${id}`);
  }
}
