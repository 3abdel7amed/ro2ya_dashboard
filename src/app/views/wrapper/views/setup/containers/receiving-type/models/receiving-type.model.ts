export interface IReceivingTypeResponse {
  count: number;
  data: IReceivingType[];
}

export interface IReceivingType {
  id: number;
  name: string;
  governorate: number;
}
