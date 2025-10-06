import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiBaseUrl = environment.apiUrl;
  private apiUrl = '/api/Menus';

  constructor(private http: HttpClient) {}

    // Fetch all menus data
    getAllMenuData(): Observable<any> {
      return this.http.get<any>(`${this.apiBaseUrl}${this.apiUrl}`);
    }
    requestOrder(data:any): Observable<any> {
      return this.http.post<any>(`${this.apiBaseUrl}/api/Orders`,data);
    }
    // getAllMenuData(): Observable<any> {
    //   return this.http.get<any>(`${this.apiBaseUrl}${this.apiUrl}`);
    // }
    
}
