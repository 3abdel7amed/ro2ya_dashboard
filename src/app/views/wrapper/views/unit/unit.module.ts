import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { CreateUnitContainerComponent } from './create-unit/containers/create-unit-container/create-unit-container.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UnitShowDialogComponent } from './create-unit/components/unit-show-dialog/unit-show-dialog.component';
import { NgbPagination, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UnitDeleteDialogComponent } from './create-unit/components/unit-delete-dialog/unit-delete-dialog.component';
import { UnitCreateDialogComponent } from './create-unit/components/unit-create-dialog/unit-create-dialog.component';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    CreateUnitComponent,
    CreateUnitContainerComponent,
    UnitShowDialogComponent,
    UnitCreateDialogComponent,
    UnitDeleteDialogComponent,
  ],

  imports: [
    CommonModule,
    UnitRoutingModule,
    NgbPagination,
    NgbTooltip,
    ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbComponent,
  ],
})
export class UnitModule {}
