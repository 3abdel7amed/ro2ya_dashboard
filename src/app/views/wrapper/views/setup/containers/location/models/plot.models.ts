export interface IPlotResponse {
  count: number;
  data: IPlot[];
}

export interface IPlot {
  id: number;
  name: string;
  governorate: number;
}
