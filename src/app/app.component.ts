import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { WaterQualityDashboardComponent } from './components/water-quality-dashboard/water-quality-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, WaterQualityDashboardComponent],
  template: `
    <div class="app-container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'wpr-water-quality-dashboard';
}