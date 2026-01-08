import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/interfaces/users/user.interface';
import { apiConfig } from '../config/api.config';
import { AuthService } from '../modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${apiConfig.backofficeBaseUrl}/api/Users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData(): Observable<UserResponse> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : undefined;
    const options = headers ? { headers } : {};

    return this.http.get<UserResponse>(this.apiUrl, options);
  }
}
