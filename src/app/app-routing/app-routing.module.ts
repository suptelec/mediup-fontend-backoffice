import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { NoAuthGuard } from '../guards/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'user-profile',
    loadComponent: () => import('../modules/user-profile/user-profile.component').then((m) => m.UserProfileComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'transformers/create',
    loadComponent: () => import('../modules/transformers/transformer-create.component').then((m) => m.TransformerCreateComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'meters-map',
    loadChildren: () => import('../modules/meters-map/meters-map.module').then((m) => m.MetersMapModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    loadChildren: () => import('../modules/reports/reports.module').then((m) => m.ReportsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'energy-measurement',
    loadChildren: () => import('../modules/energy-measurement/energy-measurement.module').then((m) => m.EnergyMeasurementModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'file-upload',
    loadChildren: () => import('../modules/file-upload/file-upload.module').then((m) => m.FileUploadModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../modules/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
