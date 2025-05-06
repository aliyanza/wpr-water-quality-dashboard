import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterQualityService } from '../../services/water-quality.service';
import { WaterQualityData } from '../../models/water-quality.model';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-water-quality-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './water-quality-dashboard.component.html',
  styleUrls: ['./water-quality-dashboard.component.css']
})
export class WaterQualityDashboardComponent implements OnInit, OnDestroy {
  waterQualityData: WaterQualityData | null = null;
  connectionStatus: string = 'Desconectado';
  private dataSubscription: Subscription | null = null;
  private connectionSubscription: Subscription | null = null;

  constructor(private waterQualityService: WaterQualityService) {}

  ngOnInit() {
    this.dataSubscription = this.waterQualityService.getWaterQualityData().subscribe(
      data => {
        console.log('Datos actualizados:', data);
        this.waterQualityData = data;
      }
    );

    this.checkConnectionStatus();
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
    this.connectionSubscription?.unsubscribe();
  }

  private checkConnectionStatus(): void {
    this.connectionSubscription = this.waterQualityService.getConnectionStatus().subscribe(
      status => {
        this.connectionStatus = status || 'Desconectado';
      }
    );
  }

  calculatePhGaugeOffset(): number {
    const phValue = this.waterQualityData?.phLevel;
    if (phValue === undefined || phValue === null) {
      return 251.2;
    }

    const percentage = phValue / 14;
    return 251.2 * (1 - percentage);
  }

  calculateWaterQualityGaugeOffset(): number {
    const qualityIndex = this.waterQualityData?.waterQualityIndex;
    if (qualityIndex === undefined || qualityIndex === null) {
      return 251.2;
    }

    const percentage = Math.min(qualityIndex / 1000, 1);
    return 251.2 * (1 - percentage);
  }

  getPhColorClass(phValue: number | undefined | null): string {
    if (phValue === undefined || phValue === null) {
      return 'ph-level-7';
    }

    const roundedPh = Math.round(phValue);
    const boundedPh = Math.max(0, Math.min(14, roundedPh));
    return `ph-level-${boundedPh}`;
  }
}
