import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlot, IPlotResponse } from '../models/plot.models';
import { environment } from '../../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PlotService {
  constructor(private _HttpClient: HttpClient) {}

  addPlot(name: { name: string }): Observable<IPlot> {
    return this._HttpClient.post<IPlot>(
      `${environment.apiUrl}/PlotOp/add/`,
      name
    );
  }

  updatePlot(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IPlot> {
    return this._HttpClient.put<IPlot>(
      `${environment.apiUrl}/PlotOp/edit/${id}/`,
      name
    );
  }

  getPlotById(id: number): Observable<IPlot> {
    return this._HttpClient.get<IPlot>(
      `${environment.apiUrl}/GetPlotById/${id}/`
    );
  }

  deletePlot(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetPlotById/${id}/`
    );
  }

  getViewAllPlot(): Observable<IPlotResponse> {
    return this._HttpClient.get<IPlotResponse>(
      `${environment.apiUrl}/GetPlotList/`
    );
  }

  getViewPlotByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IPlotResponse> {
    return this._HttpClient.post<IPlotResponse>(
      `${environment.apiUrl}/PlotList/`,
      pagination
    );
  }
}
