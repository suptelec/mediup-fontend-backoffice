import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from 'src/app/config/api.config';
import { MeterInfo } from 'src/app/model/interfaces/meters/meterInfo';
import { AuthService } from '../auth/auth.service';
import { ApiResponse } from 'src/app/model/interfaces/generics/apiResponse';

@Injectable({ providedIn: 'root' })
export class MetersMapService {
  private readonly apiUrl = `${apiConfig.frontofficeBaseUrl}/api/LightMeter`;

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {}

  getMeters(): Observable<ApiResponse<MeterInfo[]>> {
    let params = new HttpParams();

    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    const httpOptions: { params?: HttpParams; headers?: HttpHeaders } = { params };
    if (headers) httpOptions.headers = headers;

    return this.http.get<ApiResponse<MeterInfo[]>>(this.apiUrl, httpOptions);
  }
}
