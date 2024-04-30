import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../dto/login';
import { environment } from '../../../environment/environment';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response';
import { Constants } from '../../../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  set setAccessToken(accessToken: string) {
    localStorage.setItem(Constants.access_token, accessToken);
  }

  get goToLogin(): string {
    return '/auth/login';
  }

  get goToAdminHomePage(): string {
    return '/wrapper';
  }

  login(loginForm: Login): Observable<LoginResponse> {
    return this._HttpClient.post<LoginResponse>(
      `${environment.apiUrl}/login/`,
      loginForm
    );
  }

  logout() {
    localStorage.removeItem('token');
    this._Router.navigate([this.goToLogin]);
  }
}
