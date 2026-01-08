import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnergyMeasurementComponent } from './energy-measurement.component';

const routes: Routes = [{ path: '', component: EnergyMeasurementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnergyMeasurementRoutingModule {}
