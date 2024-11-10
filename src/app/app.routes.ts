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
    path: '',
    pathMatch: 'full',
    redirectTo: 'users',
  },
];
