import { Component } from '@angular/core';
import { WaterQualityDashboardComponent } from './components/water-quality-dashboard/water-quality-dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'wpr-water-quality-dashboard';
}