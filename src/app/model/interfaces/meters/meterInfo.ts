// Interface generated from sample meter JSON
export interface MeterInfo {
  id: number;
  serial: string;
  codigo: string;
  model?: string | null;
  version?: string | null;
  latitude: number;
  longitude: number;
  nextCalibrationDate?: string | null; // ISO date string or null
  lastCalibrationDate?: string | null; // ISO date string or null
  status: string;
  electricCompanyId: number;
  createdBy: string;
  createdAt: string; // ISO date string
  updatedBy?: string | null;
  updatedAt?: string | null; // ISO date string or null
  manufacturingYear?: number | null;
  province?: string | null;
  sector?: string | null;
}
