import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MeterInfo } from 'src/app/model/interfaces/meters/meterInfo';
import { MatDialog } from '@angular/material/dialog';
import { MeterViewDialogComponent } from '../meter-view-dialog/meter-view-dialog.component';

@Component({
  selector: 'app-meter-popup',
  templateUrl: './meter-popup.component.html',
  styleUrls: ['./meter-popup.component.css']
})
export class MeterPopupComponent {
  @Input() meter!: MeterInfo;

  @Output() view = new EventEmitter<MeterInfo>();
  @Output() table = new EventEmitter<MeterInfo>();
  @Output() stats = new EventEmitter<MeterInfo>();
  @Output() info = new EventEmitter<MeterInfo>();

  constructor(private dialog: MatDialog) {}

  onView() {
    this.dialog.open(MeterViewDialogComponent, {
      width: '800px',
      data: { meter: this.meter }
    });
    this.view.emit(this.meter);
  }

  onTable() {
    this.table.emit(this.meter);
  }

  onStats() {
    this.stats.emit(this.meter);
  }

  onInfo() {
    this.info.emit(this.meter);
  }
}
