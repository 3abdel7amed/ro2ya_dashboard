import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { NotificationService } from '../../../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  isSubmitted: boolean = false;
  loading: boolean = false;

  get isUserNameValid(): boolean {
    if (this.loginForm.get('username')?.value) {
      return true;
    } else {
      return false;
    }
  }

  get isPasswordValid(): boolean {
    if (this.loginForm.get('password')?.value) {
      return true;
    } else {
      return false;
    }
  }

  loginSubscription: Subscription = new Subscription();

  constructor(
    private _AuthService: AuthService,
    private _NotificationService: NotificationService,
    private _Router: Router
  ) {}

  handleLogin(form: FormGroup) {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginSubscription = this._AuthService.login(form.value).subscribe(
        (response: LoginResponse) => {
          this.loading = false;
          this._AuthService.setAccessToken = response.access;
          this._NotificationService.showSuccess('Welcome back admin');
          this._Router.navigate([this._AuthService.goToAdminHomePage]);
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
