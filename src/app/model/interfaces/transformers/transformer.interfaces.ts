export interface TransformerCreatePayload {
  serial: string;
  codigo: string;
  model: string;
  brand: string;
  class: string;
  lastCalibrationDate: string | null;
  nextCalibrationDate: string | null;
  urlPicture: string;
  type: number;
  primaryCurrent: number;
  secondaryCurrent: number;
  primaryVoltage: number;
  secondaryVoltage: number;
  electricCompanyId: number;
}

export interface TransformerCreateResponse {
  result?: unknown;
  succeed?: boolean;
  success?: boolean;
  message?: string | null;
}
