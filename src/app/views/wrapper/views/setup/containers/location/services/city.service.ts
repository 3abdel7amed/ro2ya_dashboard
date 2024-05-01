import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity, ICityResponse } from '../models/city.model';
import { environment } from '../../../../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private _HttpClient: HttpClient) {}

  addCity(name: { name: string }): Observable<ICity> {
    return this._HttpClient.post<ICity>(
      `${environment.apiUrl}/CityOp/add/`,
      name
    );
  }

  updateCity(
    id: number,
    name: {
      name: string;
    }
  ): Observable<ICity> {
    return this._HttpClient.put<ICity>(
      `${environment.apiUrl}/CityOp/edit/${id}/`,
      name
    );
  }

  getCityById(id: number): Observable<ICity> {
    return this._HttpClient.get<ICity>(
      `${environment.apiUrl}/GetCityById/${id}/`
    );
  }

  deleteCity(id: number): Observable<{ data: string }> {
    return this._HttpClient.delete<{ data: string }>(
      `${environment.apiUrl}/GetCityById/${id}/`
    );
  }

  getViewAllCity(): Observable<ICityResponse> {
    return this._HttpClient.get<ICityResponse>(
      `${environment.apiUrl}/GetCityList/`
    );
  }

  getViewCityByPagination(pagination: {
    pageNum: number;
    pageLen: number;
  }): Observable<ICityResponse> {
    return this._HttpClient.post<ICityResponse>(
      `${environment.apiUrl}/CityList/`,
      pagination
    );
  }
}
