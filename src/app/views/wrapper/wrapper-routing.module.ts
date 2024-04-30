import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './containers/wrapper/wrapper.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: WrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'client',
        pathMatch: 'full',
      },
      {
        path: 'setup',
        loadChildren: () =>
          import('./views/setup/setup.module').then((m) => m.SetupModule),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./views/client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'unit',
        loadChildren: () =>
          import('./views/unit/unit.module').then((m) => m.UnitModule),
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
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
export class WrapperRoutingModule {}
