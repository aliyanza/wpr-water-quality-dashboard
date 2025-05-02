import { Component } from '@angular/core';
import { WaterQualityDashboardComponent } from '../water-quality-dashboard/water-quality-dashboard.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  imports: [WaterQualityDashboardComponent,RouterLink],
  styleUrls: ['./info-page.component.css'] // 👈 aquí el cambio
})
export class InfoPageComponent { }
