import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  isOpen$: Observable<boolean>;

  constructor(private modalService: ModalService) {
    this.isOpen$ = this.modalService.isOpen$;
  }

  close() {
    this.modalService.close();
  }
}
