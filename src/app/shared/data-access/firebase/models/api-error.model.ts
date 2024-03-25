export interface ApiError {
  code: number;
  message: string;
  errors: ParamError[];
}

export interface ParamError {
  domain: string;
  message: string;
  reason: number;
}
