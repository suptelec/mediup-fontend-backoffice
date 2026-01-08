export interface EnergyMeasurement {
  IntegrationStatus: string;
  UrlCapture: string;
  UrlZip: string;
  MupEnergymeasurementevents: MupEnergymeasurementevents[];
}

interface MupEnergymeasurementevents {
  OccurredAt: string; // ISO date string
}