import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoginPayload, LoginResponse } from 'src/app/model/interfaces/auth/login.interfaces';
import { apiConfig } from 'src/app/config/api.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${apiConfig.identityBaseUrl}/connect/token`;

  constructor(private readonly http: HttpClient) {}

  login(payload: LoginPayload): Observable<LoginResponse> {
    if (!payload.username || !payload.password) {
      return throwError(() => new Error('Las credenciales son obligatorias.'));
    }

    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', payload.username)
      .set('password', payload.password)
      .set('client_id', 'backoffice')
      .set('client_secret', 'backoffice_secret')
      .set('scope', 'bo_api offline_access');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers }).pipe(
      map((response) => {
        if (!response.access_token) {
          throw new Error('No se recibió token de autenticación.');
        }
        this.saveTokens(response);
        return response;
      }),
      catchError((error) => {
        let errorMessage = 'Error al iniciar sesión. Intenta nuevamente.';

        if (error.status === 401) {
          errorMessage = 'Usuario o contraseña incorrectos.';
        } else if (error.status === 0) {
          errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else if (error.error?.detail) {
          errorMessage = error.error.detail;
        }

        return throwError(() => new Error(errorMessage));
      })
    );
  }

  refreshToken(): Observable<LoginResponse> {
    const refresh = sessionStorage.getItem('refresh_token');
    if (!refresh) {
      return throwError(() => new Error('No hay refresh token disponible.'));
    }

    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refresh)
      .set('client_id', 'backoffice')
      .set('client_secret', 'backoffice_secret');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<LoginResponse>(this.apiUrl, body, { headers }).pipe(
      map((response) => {
        if (!response.access_token) {
          throw new Error('No se recibió token al refrescar.');
        }
        this.saveTokens(response);
        return response;
      }),
      catchError(() => {
        this.clearTokens();
        return throwError(() => new Error('No se pudo renovar la sesión. Por favor inicia sesión de nuevo.'));
      })
    );
  }

  private saveTokens(response: LoginResponse): void {
    sessionStorage.setItem('access_token', response.access_token);
    if (response.refresh_token) {
      sessionStorage.setItem('refresh_token', response.refresh_token);
    }
    const expiresAt = Date.now() + (response.expires_in || 0) * 1000;
    sessionStorage.setItem('access_token_expires_at', String(expiresAt));
  }

  private clearTokens(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token_expires_at');
  }

  logout(): void {
    this.clearTokens();
  }

  /**
   * Async check whether the user is logged in. If the access token is expired but a
   * refresh token exists, this will attempt to refresh the token and emit the result.
   */
  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    const expiresAt = this.getAccessTokenExpiresAt() || 0;

    if (token && Date.now() < expiresAt) {
      return of(true);
    }

    const refresh = this.getRefreshToken();
    if (refresh) {
      return this.refreshToken().pipe(
        map(() => true),
        catchError(() => of(false))
      );
    }

    return of(false);
  }

  /**
   * Synchronous check that does not perform network requests. Useful for quick UI checks.
   */
  isLoggedInSync(): boolean {
    const token = this.getToken();
    const expiresAt = Number(sessionStorage.getItem('access_token_expires_at')) || 0;
    if (token && Date.now() < expiresAt) {
      return true;
    }
    return !!this.getRefreshToken();
  }

  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return sessionStorage.getItem('refresh_token');
  }

  getAccessTokenExpiresAt(): number | null {
    const val = sessionStorage.getItem('access_token_expires_at');
    return val ? Number(val) : null;
  }
}
