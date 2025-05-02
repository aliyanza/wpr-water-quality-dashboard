import { Routes } from '@angular/router';
import { WaterQualityDashboardComponent } from './components/water-quality-dashboard/water-quality-dashboard.component';
import { InfoPageComponent } from './components/info-page/info-page.component';

export const routes: Routes = [
  { path: '', component: WaterQualityDashboardComponent },
  { path: 'info', component: InfoPageComponent},
  
];