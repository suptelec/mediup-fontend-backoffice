import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { EnergyMeasurementRoutingModule } from './energy-measurement-routing.module';
import { EnergyMeasurementComponent } from './energy-measurement.component';

@NgModule({
  declarations: [EnergyMeasurementComponent],
  imports: [CommonModule, SharedModule, EnergyMeasurementRoutingModule],
})
export class EnergyMeasurementModule {}
