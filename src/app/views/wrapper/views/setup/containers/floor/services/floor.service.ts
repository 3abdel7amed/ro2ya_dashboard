import { IFloor, IFloorResponse } from './../models/floor.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor(private _HttpClient: HttpClient) {}

  addFloor(name: { name: string }): Observable<IFloor> {
    return this._HttpClient.post<IFloor>(
      `${environment.apiUrl}/FloorOp/add/`,
      name
    );
  }

  updateFloor(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IFloor> {
    return this._HttpClient.put<IFloor>(
      `${environment.apiUrl}/FloorOp/edit/${id}/`,
      name
    );
  }

  getFloorById(id: number): Observable<IFloor> {
    return this._HttpClient.get<IFloor>(
      `${environment.apiUrl}/GetFloorById/${id}/`
    );
  }

  deleteFloor(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetFloorById/${id}/`
    );
  }

  getViewAllFloor(): Observable<IFloorResponse> {
    return this._HttpClient.get<IFloorResponse>(
      `${environment.apiUrl}/GetFloorList/`
    );
  }

  getViewFloorByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IFloorResponse> {
    return this._HttpClient.post<IFloorResponse>(
      `${environment.apiUrl}/FloorList/`,
      pagination
    );
  }
}
