export interface IDistrictResponse {
  count: number;
  data: IDistrict[];
}

export interface IDistrict {
  id: number;
  name: string;
  governorate: number;
}
