import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent),
  },
  {
    path: 'users/:id',
    title: 'User details',
    loadComponent: () =>
      import('./pages/user-details/user-details.component').then((m) => m.UserDetailsComponent),
  },
  {
    path: 'users/:id/edit',
    title: 'Edit user',
    loadComponent: () =>
      import('./pages/user-edit/user-edit.component').then((m) => m.UserEditComponent),
  },
  { path: '**', redirectTo: 'dashboard' },
];
