import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/voto', pathMatch: 'full' },
  { path: 'voto', loadComponent: () => import('./components/voto/voto.component').then(m => m.VotoComponent) },
  { path: 'admin', component: AdminComponent } // ✅ Ruta del panel
];
