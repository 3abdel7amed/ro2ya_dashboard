import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientManagmentComponent } from './client-managment/client-managment.component';

const routes: Routes = [
  {
    path: '',
    component: ClientManagmentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
