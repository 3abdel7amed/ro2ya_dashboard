export interface IZoneResponse {
  count: number;
  data: IZone[];
}

export interface IZone {
  id: number;
  name: string;
  governorate: number;
}
