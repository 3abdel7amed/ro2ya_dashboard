import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitRoutingModule } from './unit-routing.module';
import { CreateUnitComponent } from './create-unit/create-unit.component';


@NgModule({
  declarations: [
    CreateUnitComponent
  ],
  imports: [
    CommonModule,
    UnitRoutingModule
  ]
})
export class UnitModule { }
