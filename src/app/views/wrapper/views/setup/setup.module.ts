import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRoutingModule } from './setup-routing.module';
import { LocationComponent } from './containers/location/location.component';
import { DirectionComponent } from './containers/directions/direction.component';
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
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { GovernmentCreateModalComponent } from './containers/location/containers/government/components/government-create/government-create-modal.component';
import { CityCreateComponent } from './containers/location/containers/city/components/city-create/city-create.component';
import { GovernmentDeleteComponent } from './containers/location/containers/government/components/government-delete/government-delete.component';
import { CityDeleteComponent } from './containers/location/containers/city/components/city-delete/city-delete.component';
import { UpdateCityComponent } from './containers/location/containers/city/components/update-city/update-city.component';
import { ZoneCreateComponent } from './containers/location/containers/zone/components/zone-create/zone-create.component';
import { ZoneUpdateComponent } from './containers/location/containers/zone/components/zone-update/zone-update.component';
import { ZoneDeleteComponent } from './containers/location/containers/zone/components/zone-delete/zone-delete.component';
import { PlotCreateComponent } from './containers/location/containers/plot/components/plot-create/plot-create.component';
import { PlotUpdateComponent } from './containers/location/containers/plot/components/plot-update/plot-update.component';
import { PlotDeleteComponent } from './containers/location/containers/plot/components/plot-delete/plot-delete.component';
import { DistrictCreateComponent } from './containers/location/containers/district/components/district-create/district-create.component';
import { DistrictUpdateComponent } from './containers/location/containers/district/components/district-update/district-update.component';
import { DistrictDeleteComponent } from './containers/location/containers/district/components/district-delete/district-delete.component';
import { FloorCreateComponent } from './containers/floor/components/floor-create/floor-create.component';
import { FloorDeleteComponent } from './containers/floor/components/floor-delete/floor-delete.component';
import { FloorContainerComponent } from './containers/floor/containers/floor-container/floor-container.component';
import { DirectionsCreateComponent } from './containers/directions/components/directions-create/directions-create.component';
import { DirectionsContainerComponent } from './containers/directions/containers/directions-container/directions-container.component';
import { DirectionsDeleteComponent } from './containers/directions/components/directions-delete/directions-delete.component';
import { FinishingTypeContainerComponent } from './containers/finishing-type/containers/finishing-type-container/finishing-type-container.component';
import { FinishingTypeCreateComponent } from './containers/finishing-type/components/finishing-type-create/finishing-type-create.component';
import { FinishingTypeDeleteComponent } from './containers/finishing-type/components/finishing-type-delete/finishing-type-delete.component';
import { UnitTypeContainerComponent } from './containers/unit-type/containers/unit-type-container/unit-type-container.component';
import { UnitTypeCreateComponent } from './containers/unit-type/components/unit-type-create/unit-type-create.component';
import { UnitTypeDeleteComponent } from './containers/unit-type/components/unit-type-delete/unit-type-delete.component';
import { ReceivingTypeContainerComponent } from './containers/receiving-type/containers/receiving-type-container/receiving-type-container.component';
import { ReceivingTypeCreateComponent } from './containers/receiving-type/components/receiving-type-create/receiving-type-create.component';
import { ReceivingTypeDeleteComponent } from './containers/receiving-type/components/receiving-type-delete/receiving-type-delete.component';

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
    GovernmentDeleteComponent,
    CityComponent,
    CityCreateComponent,
    CityDeleteComponent,
    ZoneComponent,
    DistrictComponent,
    PlotComponent,
    BreadcrumbComponent,
    GovernmentCreateModalComponent,
    UpdateCityComponent,
    ZoneCreateComponent,
    ZoneUpdateComponent,
    ZoneDeleteComponent,
    PlotCreateComponent,
    PlotUpdateComponent,
    PlotDeleteComponent,
    DistrictCreateComponent,
    DistrictUpdateComponent,
    DistrictDeleteComponent,
    FloorCreateComponent,
    FloorDeleteComponent,
    FloorContainerComponent,
    DirectionsCreateComponent,
    DirectionsContainerComponent,
    DirectionsDeleteComponent,
    FinishingTypeContainerComponent,
    FinishingTypeCreateComponent,
    FinishingTypeDeleteComponent,
    UnitTypeContainerComponent,
    UnitTypeCreateComponent,
    UnitTypeDeleteComponent,
    ReceivingTypeContainerComponent,
    ReceivingTypeCreateComponent,
    ReceivingTypeDeleteComponent,
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
