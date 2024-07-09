import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'star-wars',
    loadChildren: () =>
      import('./star-wars/star-wars.module').then((m) => m.StarWarsModule),
  },
  {
    path: 'file-management',
    loadChildren: () =>
      import('./file-management/file-management.module').then(
        (m) => m.FileManagementModule
      ),
  },
  { path: '', redirectTo: '/star-wars', pathMatch: 'full' },
  { path: '**', redirectTo: '/star-wars' },
];
