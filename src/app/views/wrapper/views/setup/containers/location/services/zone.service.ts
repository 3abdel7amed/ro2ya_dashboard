import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IZone, IZoneResponse } from '../models/zone.model';
import { environment } from '../../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private _HttpClient: HttpClient) {}

  addZone(name: { name: string }): Observable<IZone> {
    return this._HttpClient.post<IZone>(
      `${environment.apiUrl}/ZoneOp/add/`,
      name
    );
  }

  updateZone(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IZone> {
    return this._HttpClient.put<IZone>(
      `${environment.apiUrl}/ZoneOp/edit/${id}/`,
      name
    );
  }

  getZoneById(id: number): Observable<IZone> {
    return this._HttpClient.get<IZone>(
      `${environment.apiUrl}/GetZoneById/${id}/`
    );
  }

  deleteZone(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetZoneById/${id}/`
    );
  }

  getViewAllZone(): Observable<IZoneResponse> {
    return this._HttpClient.get<IZoneResponse>(
      `${environment.apiUrl}/GetZoneList/`
    );
  }

  getViewZoneByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IZoneResponse> {
    return this._HttpClient.post<IZoneResponse>(
      `${environment.apiUrl}/ZoneList/`,
      pagination
    );
  }
}
