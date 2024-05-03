export interface IFinishingResponse {
  count: number;
  data: IFinishing[];
}

export interface IFinishing {
  id: number;
  name: string;
  governorate: number;
}
