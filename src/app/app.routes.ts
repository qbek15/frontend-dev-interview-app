import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'users',
    title: 'Users',
    loadComponent: () => import('./pages/users/users').then((m) => m.Users),
  },
  {
    path: 'users/:id',
    title: 'User details',
    loadComponent: () => import('./pages/user-details/user-details').then((m) => m.UserDetails),
  },
  { path: '**', redirectTo: 'dashboard' },
];
