import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environment/environment';
import { IUnit, IUnitRsponse } from '../model/unit.model';
import { IUnitCreateDto } from '../dto/unit-create.dto';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private _HttpClient: HttpClient) {}

  addUnit(data: IUnitCreateDto): Observable<IUnit> {
    return this._HttpClient.post<IUnit>(
      `${environment.apiUrl}/UnitOp/add/`,
      data
    );
  }

  updateUnit(
    id: number,
    data: {
      data: IUnitCreateDto;
    }
  ): Observable<IUnit> {
    return this._HttpClient.put<IUnit>(
      `${environment.apiUrl}/UnitOp/edit/${id}/`,
      data
    );
  }

  getUnitById(id: number): Observable<IUnit> {
    return this._HttpClient.get<IUnit>(
      `${environment.apiUrl}/GetUnitById/${id}/`
    );
  }

  deleteUnit(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetUnitById/${id}/`
    );
  }

  getViewAllUnit(): Observable<IUnitRsponse> {
    return this._HttpClient.get<IUnitRsponse>(
      `${environment.apiUrl}/GetUnitList/`
    );
  }

  getViewUnitByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<IUnitRsponse> {
    return this._HttpClient.post<IUnitRsponse>(
      `${environment.apiUrl}/UnitList/`,
      pagination
    );
  }
}
