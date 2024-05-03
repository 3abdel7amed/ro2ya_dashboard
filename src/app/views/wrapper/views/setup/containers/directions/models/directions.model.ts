export interface IDirectionsResponse {
  count: number;
  data: IDirections[];
}

export interface IDirections {
  id: number;
  name: string;
  governorate: number;
}
