import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDistrict, IDistrictResponse } from '../models/district.model';
import { environment } from '../../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  constructor(private _HttpClient: HttpClient) {}

  addDistrict(name: { name: string }): Observable<IDistrict> {
    return this._HttpClient.post<IDistrict>(
      `${environment.apiUrl}/DistrictOp/add/`,
      name
    );
  }

  updateDistrict(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IDistrict> {
    return this._HttpClient.put<IDistrict>(
      `${environment.apiUrl}/DistrictOp/edit/${id}/`,
      name
    );
  }

  getDistrictById(id: number): Observable<IDistrict> {
    return this._HttpClient.get<IDistrict>(
      `${environment.apiUrl}/GetDistrictById/${id}/`
    );
  }

  deleteDistrict(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetDistrictById/${id}/`
    );
  }

  getViewAllDistrict(): Observable<IDistrictResponse> {
    return this._HttpClient.get<IDistrictResponse>(
      `${environment.apiUrl}/GetDistrictList/`
    );
  }

  getViewDistrictByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IDistrictResponse> {
    return this._HttpClient.post<IDistrictResponse>(
      `${environment.apiUrl}/DistrictList/`,
      pagination
    );
  }
}
