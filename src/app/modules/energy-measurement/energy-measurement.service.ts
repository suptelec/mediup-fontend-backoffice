import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Measurement } from '../../model/interfaces/energy-measurement/measurement.interface';
import { ApiResponse } from 'src/app/model/interfaces/generics/apiResponse';
import { apiConfig } from 'src/app/config/api.config';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EnergyMeasurementService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  energyMeasurementDownload(): Observable<ApiResponse<Measurement[]>> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    const options = headers ? { headers } : {};
    return this.http.get<ApiResponse<Measurement[]>>(`${apiConfig.backofficeBaseUrl}/api/EnergyMeasurementDownload`, options);
  }
}
