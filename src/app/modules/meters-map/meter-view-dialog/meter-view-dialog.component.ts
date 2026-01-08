import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeterInfo } from 'src/app/model/interfaces/meters/meterInfo';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { apiConfig } from 'src/app/config/api.config';
import { PaginatedResponse } from 'src/app/model/interfaces/generics/paginatedResponse';
import { EnergyMeasurement } from 'src/app/model/interfaces/energy-measurement/energyMeasurement';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-meter-view-dialog',
  templateUrl: './meter-view-dialog.component.html',
  styleUrls: ['./meter-view-dialog.component.css'],
  
})
export class MeterViewDialogComponent implements OnInit {
  public result: EnergyMeasurement[] | null = null;
  public displayedColumns: string[] = ['occurredAt', 'integrationStatus',  'urlZip', 'urlCapture'];
  public loading = false;
  public error: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<MeterViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { meter: MeterInfo },
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadMeasurements();
  }

  loadMeasurements() {
    const params = `select=integrationStatus,urlCapture,urlZip,mupEnergymeasurementevents/occurredAt&$filter=${encodeURIComponent('meter eq \'' + this.data.meter.codigo + '\'')}`;
    const token = sessionStorage.getItem('access_token');
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();

    this.loading = true;
    this.http.get<PaginatedResponse<EnergyMeasurement[]>>(`${apiConfig.frontofficeBaseUrl}/api/EnergyMeasurementDownload?${params}`, { headers })
      .subscribe({
        next: response => {
          try {
            this.result = response.result;         
          } catch {
            this.error = 'Error al procesar las mediciones';
          }
          this.loading = false;
        },
        error: err => {
          this.error = err?.message || 'Error al cargar las mediciones';
          this.loading = false;
        }
      });
  }

  close() {
    this.dialogRef.close();
  }
}