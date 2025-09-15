import { Routes } from '@angular/router';
import { InspectionsListComponent } from './inspections/list/list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inspections', pathMatch: 'full' },
  { path: 'inspections', component: InspectionsListComponent },
  {
    path: 'inspections/:id',
    loadComponent: () =>
      import('./inspections/list/components/detail/detail.component').then(
        (m) => m.DetailComponent
      ),
  },
  { path: '**', redirectTo: '/inspections' },
];
