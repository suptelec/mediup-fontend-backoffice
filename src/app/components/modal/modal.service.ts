import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private _open$ = new BehaviorSubject<boolean>(false);

  get isOpen$(): Observable<boolean> {
    return this._open$.asObservable();
  }

  open() {
    this._open$.next(true);
  }

  close() {
    this._open$.next(false);
  }

  toggle() {
    this._open$.next(!this._open$.value);
  }
}
