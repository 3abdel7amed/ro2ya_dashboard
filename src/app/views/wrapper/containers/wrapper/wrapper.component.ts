import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
})
export class WrapperComponent {
  isCollapsed = true;
  screenWidth!: number;

  @HostListener('window:resize', ['$event'])
  onResize($event: any) {
    this.screenWidth = window.innerWidth;
  }

  constructor(private _AuthService: AuthService) {
    this.screenWidth = window.innerWidth;
  }

  logout() {
    this._AuthService.logout();
  }
}
