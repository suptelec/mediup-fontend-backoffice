import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '../config/api.config';
import { AuthService } from '../modules/auth/auth.service';
import { TransformerCreatePayload, TransformerCreateResponse } from '../model/interfaces/transformers/transformer.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TransformerService {
  private readonly apiUrl = `${apiConfig.backofficeBaseUrl}/api/LigtherTransformers`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createTransformer(payload: TransformerCreatePayload): Observable<TransformerCreateResponse> {
    const token = this.authService.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    const options = headers ? { headers } : {};

    return this.http.post<TransformerCreateResponse>(this.apiUrl, payload, options);
  }
}
