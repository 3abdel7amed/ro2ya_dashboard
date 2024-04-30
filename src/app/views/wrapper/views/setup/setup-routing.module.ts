import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './containers/contact/contact.component';
import { DirectionComponent } from './containers/direction/direction.component';
import { ExtraFeaturesComponent } from './containers/extra-features/extra-features.component';
import { FinishingTypeComponent } from './containers/finishing-type/finishing-type.component';
import { FloorComponent } from './containers/floor/floor.component';
import { LocationComponent } from './containers/location/location.component';
import { ReceivingTypeComponent } from './containers/receiving-type/receiving-type.component';
import { UnitTypeComponent } from './containers/unit-type/unit-type.component';
import { NotFoundComponent } from '../../../../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'direction',
    component: DirectionComponent,
  },
  {
    path: 'extra_features',
    component: ExtraFeaturesComponent,
  },
  {
    path: 'finishing_type',
    component: FinishingTypeComponent,
  },
  {
    path: 'floor',
    component: FloorComponent,
  },
  {
    path: 'location',
    component: LocationComponent,
  },
  {
    path: 'receiving_type',
    component: ReceivingTypeComponent,
  },
  {
    path: 'unit_type',
    component: UnitTypeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
