import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFinishing, IFinishingResponse } from '../models/finihsing-type.model';
import { environment } from '../../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FinishingTypeService {
  constructor(private _HttpClient: HttpClient) {}

  addFinishing(name: { name: string }): Observable<IFinishing> {
    return this._HttpClient.post<IFinishing>(
      `${environment.apiUrl}/FinishingTypeOp/add/`,
      name
    );
  }

  updateFinishing(
    id: number,
    name: {
      name: string;
    }
  ): Observable<IFinishing> {
    return this._HttpClient.put<IFinishing>(
      `${environment.apiUrl}/FinishingTypeOp/edit/${id}/`,
      name
    );
  }

  getFinishingById(id: number): Observable<IFinishing> {
    return this._HttpClient.get<IFinishing>(
      `${environment.apiUrl}/GetFinishingTypeById/${id}/`
    );
  }

  deleteFinishing(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetFinishingTypeById/${id}/`
    );
  }

  getViewAllFinishing(): Observable<IFinishingResponse> {
    return this._HttpClient.get<IFinishingResponse>(
      `${environment.apiUrl}/GetFinishingTypeList/`
    );
  }

  getViewFinishingByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IFinishingResponse> {
    return this._HttpClient.post<IFinishingResponse>(
      `${environment.apiUrl}/FinishingTypeList/`,
      pagination
    );
  }
}
