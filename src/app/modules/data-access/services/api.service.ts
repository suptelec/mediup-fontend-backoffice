import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiService {
  getStatus(): Observable<string> {
    return of('API service ready');
  }
}
