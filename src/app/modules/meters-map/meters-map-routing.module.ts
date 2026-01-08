import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetersMapComponent } from './meters-map.component';

const routes: Routes = [{ path: '', component: MetersMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetersMapRoutingModule {}
