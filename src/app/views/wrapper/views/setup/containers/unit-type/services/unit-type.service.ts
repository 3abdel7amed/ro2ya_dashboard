import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environment/environment';
import { IUnitType, IUnitTypeResponse } from '../models/unit-type.model';

@Injectable({
  providedIn: 'root',
})
export class UnitTypeService {
  constructor(private _HttpClient: HttpClient) {}

  addUnitType(name: { name: string }): Observable<IUnitType> {
    return this._HttpClient.post<IUnitType>(
      `${environment.apiUrl}/UnitTypeOp/add/`,
      name
    );
  }

  updateUnitType(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IUnitType> {
    return this._HttpClient.put<IUnitType>(
      `${environment.apiUrl}/UnitTypeOp/edit/${id}/`,
      name
    );
  }

  getUnitTypeById(id: number): Observable<IUnitType> {
    return this._HttpClient.get<IUnitType>(
      `${environment.apiUrl}/GetUnitTypeById/${id}/`
    );
  }

  deleteUnitType(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetUnitTypeById/${id}/`
    );
  }

  getViewAllUnitType(): Observable<IUnitTypeResponse> {
    return this._HttpClient.get<IUnitTypeResponse>(
      `${environment.apiUrl}/GetUnitTypeList/`
    );
  }

  getViewUnitTypeByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IUnitTypeResponse> {
    return this._HttpClient.post<IUnitTypeResponse>(
      `${environment.apiUrl}/UnitTypeList/`,
      pagination
    );
  }
}
