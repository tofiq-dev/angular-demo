import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/user-list/user-list.component').then((c) => c.UserListPage),
  },
];
