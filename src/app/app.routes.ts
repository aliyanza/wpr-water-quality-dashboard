import { Routes } from '@angular/router';
import { WaterQualityDashboardComponent } from './components/water-quality-dashboard/water-quality-dashboard.component';

export const routes: Routes = [
  { path: '', component: WaterQualityDashboardComponent },
  { path: '**', redirectTo: '' }
];