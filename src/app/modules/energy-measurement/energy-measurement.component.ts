import { Component, OnInit } from '@angular/core';
import { EnergyMeasurementService } from './energy-measurement.service';
import { Measurement } from '../../model/interfaces/energy-measurement/measurement.interface';

@Component({
  selector: 'app-energy-measurement',
  templateUrl: './energy-measurement.component.html',
  styleUrls: ['./energy-measurement.component.css'],
})
export class EnergyMeasurementComponent implements OnInit {
  measurements: Measurement[] = [];

  constructor(private svc: EnergyMeasurementService) {}

  ngOnInit(): void {
    this.svc.energyMeasurementDownload().subscribe((data) => (this.measurements = data.result));
  }
}
