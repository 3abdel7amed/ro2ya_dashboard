import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environment/environment';
import { IDirections, IDirectionsResponse } from '../models/directions.model';

@Injectable({
  providedIn: 'root',
})
export class DirectionsService {
  constructor(private _HttpClient: HttpClient) {}

  addDirections(name: { name: string }): Observable<IDirections> {
    return this._HttpClient.post<IDirections>(
      `${environment.apiUrl}/DirectionOp/add/`,
      name
    );
  }

  updateDirections(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IDirections> {
    return this._HttpClient.put<IDirections>(
      `${environment.apiUrl}/DirectionOp/edit/${id}/`,
      name
    );
  }

  getDirectionsById(id: number): Observable<IDirections> {
    return this._HttpClient.get<IDirections>(
      `${environment.apiUrl}/GetDirectionById/${id}/`
    );
  }

  deleteDirections(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetDirectionById/${id}/`
    );
  }

  getViewAllDirections(): Observable<IDirectionsResponse> {
    return this._HttpClient.get<IDirectionsResponse>(
      `${environment.apiUrl}/GetDirectionList/`
    );
  }

  getViewDirectionsByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IDirectionsResponse> {
    return this._HttpClient.post<IDirectionsResponse>(
      `${environment.apiUrl}/DirectionList/`,
      pagination
    );
  }
}
