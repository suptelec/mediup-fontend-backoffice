import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataAccessModule } from '../data-access/data-access.module';
import { CoreLayoutComponent } from './core.layout';

@NgModule({
  declarations: [CoreLayoutComponent],
  imports: [CommonModule, RouterModule, DataAccessModule],
  exports: [CoreLayoutComponent, DataAccessModule],
})
export class CoreModule {}
