export interface IFloorResponse {
  count: number;
  data: IFloor[];
}

export interface IFloor {
  id: number;
  name: string;
  governorate: number;
}
