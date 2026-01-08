import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  isLoading$: Observable<boolean>;

  constructor(private spinner: SpinnerService) {
    this.isLoading$ = this.spinner.isLoading$;
  }
}
