import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { wrapperGuard } from './views/auth/guards/wrapper.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'wrapper', pathMatch: 'full' },
  {
    path: 'wrapper',
    loadChildren: () =>
      import('./views/wrapper/wrapper.module').then((m) => m.WrapperModule),
    canActivate: [wrapperGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '**', component: NotFoundComponent },
];
