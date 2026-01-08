import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MetersMapRoutingModule } from './meters-map-routing.module';
import { MetersMapComponent } from './meters-map.component';
import { MeterPopupComponent } from './meter-popup/meter-popup.component';

/* Material */
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MeterViewDialogComponent } from './meter-view-dialog/meter-view-dialog.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    MetersMapComponent,
    MeterPopupComponent,
    MeterViewDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MetersMapRoutingModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class MetersMapModule {}
