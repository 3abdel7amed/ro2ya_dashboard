import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environment/environment';
import {
  IReceivingType,
  IReceivingTypeResponse,
} from '../models/receiving-type.model';

@Injectable({
  providedIn: 'root',
})
export class ReceivingTypeService {
  constructor(private _HttpClient: HttpClient) {}

  addReceivingType(name: { name: string }): Observable<IReceivingType> {
    return this._HttpClient.post<IReceivingType>(
      `${environment.apiUrl}/ReceivingTypeOp/add/`,
      name
    );
  }

  updateReceivingType(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IReceivingType> {
    return this._HttpClient.put<IReceivingType>(
      `${environment.apiUrl}/ReceivingTypeOp/edit/${id}/`,
      name
    );
  }

  getReceivingTypeById(id: number): Observable<IReceivingType> {
    return this._HttpClient.get<IReceivingType>(
      `${environment.apiUrl}/GetReceivingTypeById/${id}/`
    );
  }

  deleteReceivingType(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetReceivingTypeById/${id}/`
    );
  }

  getViewAllReceivingType(): Observable<IReceivingTypeResponse> {
    return this._HttpClient.get<IReceivingTypeResponse>(
      `${environment.apiUrl}/GetReceivingTypeList/`
    );
  }

  getViewReceivingTypeByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IReceivingTypeResponse> {
    return this._HttpClient.post<IReceivingTypeResponse>(
      `${environment.apiUrl}/ReceivingTypeList/`,
      pagination
    );
  }
}
