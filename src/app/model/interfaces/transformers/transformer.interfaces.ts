export interface TransformerCreatePayload {
  name: string;
  code: string;
  capacityKva?: number | null;
  description?: string | null;
}

export interface TransformerCreateResponse {
  result?: unknown;
  succeed?: boolean;
  success?: boolean;
  message?: string | null;
}
