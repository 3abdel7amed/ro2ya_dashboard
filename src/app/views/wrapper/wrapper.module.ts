import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WrapperRoutingModule } from './wrapper-routing.module';
import { WrapperComponent } from './containers/wrapper/wrapper.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [WrapperComponent],
  imports: [
    CommonModule,
    WrapperRoutingModule,
    NgbDropdownModule,
    HttpClientModule,
    NgbCollapseModule,
  ],
  providers: [AuthService],
})
export class WrapperModule {}
