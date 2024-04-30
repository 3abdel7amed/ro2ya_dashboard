export interface SingleGovernmentResponse {
  data: Data;
}

export interface Data {
  id: number;
  name: string;
}

export interface ViewGovernment {
  count: number;
  data: SingleGovernment[];
}

export interface SingleGovernment {
  id: number;
  name: string;
}
