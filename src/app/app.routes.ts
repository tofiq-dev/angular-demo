import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-list/user-list.component').then((c) => c.UserListPage),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import('./pages/user-details/user-details.component').then((c) => c.UserDetailsPage),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((c) => c.NotFoundPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
  { path: '**', pathMatch: 'full', redirectTo: 'not-found' },
];
