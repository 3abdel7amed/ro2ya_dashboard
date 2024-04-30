import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { LocationComponent } from './containers/location/location.component';
import { DirectionComponent } from './containers/direction/direction.component';
import { FloorComponent } from './containers/floor/floor.component';
import { FinishingTypeComponent } from './containers/finishing-type/finishing-type.component';
import { UnitTypeComponent } from './containers/unit-type/unit-type.component';
import { ReceivingTypeComponent } from './containers/receiving-type/receiving-type.component';
import { ContactComponent } from './containers/contact/contact.component';
import { ExtraFeaturesComponent } from './containers/extra-features/extra-features.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { GovernmentComponent } from './containers/location/containers/government/government.component';
import { CityComponent } from './containers/location/containers/city/city.component';
import { ZoneComponent } from './containers/location/containers/zone/zone.component';
import { DistrictComponent } from './containers/location/containers/district/district.component';
import { PlotComponent } from './containers/location/containers/plot/plot.component';
import { BreadcrumbComponent } from '../../../../shared/breadcrumb/breadcrumb.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { GovernmentCreateModalComponent } from './containers/location/containers/government/components/government-create/government-create-modal.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { GovernmentDeleteComponent } from './containers/location/containers/government/components/government-delete/government-delete.component';

@NgModule({
  declarations: [
    LocationComponent,
    DirectionComponent,
    FloorComponent,
    FinishingTypeComponent,
    UnitTypeComponent,
    ReceivingTypeComponent,
    ContactComponent,
    ExtraFeaturesComponent,
    GovernmentComponent,
    CityComponent,
    ZoneComponent,
    DistrictComponent,
    PlotComponent,
    BreadcrumbComponent,
    GovernmentCreateModalComponent,
    GovernmentDeleteComponent,
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbTooltipModule,
    HttpClientModule,
    NgbDropdownModule,
    ReactiveFormsModule,
  ],
})
export class SetupModule {}
