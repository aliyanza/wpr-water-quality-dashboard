import { Component } from '@angular/core';
import { WaterQualityDashboardComponent } from './components/water-quality-dashboard/water-quality-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WaterQualityDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wpr-water-quality-dashboard';
}