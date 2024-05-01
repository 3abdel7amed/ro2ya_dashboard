export interface ICityResponse {
  count: number;
  data: ICity[];
}

export interface ICity {
  id: number;
  name: string;
  governorate: number;
}
