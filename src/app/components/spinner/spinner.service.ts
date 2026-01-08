import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SpinnerService {
  private _count = 0;
  private _loading$ = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  show() {
    this._count = Math.max(0, this._count) + 1;
    if (this._count > 0) {
      this._loading$.next(true);
    }
  }

  hide() {
    this._count = Math.max(0, this._count - 1);
    if (this._count <= 0) {
      this._loading$.next(false);
    }
  }

  // Helper to wrap an observable so the spinner is shown while it executes
  track<T>(obs: Observable<T>): Observable<T> {
    this.show();
    return obs.pipe(finalize(() => this.hide()));
  }
}
