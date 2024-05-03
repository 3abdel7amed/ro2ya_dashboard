export interface IUnitTypeResponse {
  count: number;
  data: IUnitType[];
}

export interface IUnitType {
  id: number;
  name: string;
  governorate: number;
}
