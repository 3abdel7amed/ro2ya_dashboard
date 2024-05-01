import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environment/environment';
import { Observable } from 'rxjs';
import {
  SingleGovernmentResponse,
  ViewGovernment,
} from '../models/government.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private _HttpClient: HttpClient) {}

  // LocationMethods

  //  TODO: Governormnet Methods ----------------->
  addGovernment(goverName: {
    name: string;
  }): Observable<SingleGovernmentResponse> {
    return this._HttpClient.post<SingleGovernmentResponse>(
      `${environment.apiUrl}/GovernorateOp/add/`,
      goverName
    );
  }

  updateGovernment(
    goverId: number,
    goverName: {
      name: string;
    }
  ): Observable<SingleGovernmentResponse> {
    return this._HttpClient.put<SingleGovernmentResponse>(
      `${environment.apiUrl}/GovernorateOp/edit/${goverId}/`,
      goverName
    );
  }

  getGoverById(goverId: number): Observable<SingleGovernmentResponse> {
    return this._HttpClient.get<SingleGovernmentResponse>(
      `${environment.apiUrl}/GetGovernorateById/${goverId}/`
    );
  }

  deleteGover(goverId: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetGovernorateById/${goverId}/`
    );
  }

  getViewAllGover(): Observable<ViewGovernment> {
    return this._HttpClient.get<ViewGovernment>(
      `${environment.apiUrl}/GetGovernorateList/`
    );
  }

  getViewGoverByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<ViewGovernment> {
    return this._HttpClient.post<ViewGovernment>(
      `${environment.apiUrl}/GovernorateList/`,
      pagination
    );
  }
}
