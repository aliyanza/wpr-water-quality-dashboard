import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WaterQualityService } from '../../services/water-quality.service';
import { WaterQualityData } from '../../models/water-quality.model';

@Component({
  selector: 'app-water-quality-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './water-quality-dashboard.component.html',
  styleUrls: ['./water-quality-dashboard.component.css']
})
export class WaterQualityDashboardComponent implements OnInit {
  waterQualityData: WaterQualityData | null = null;

  constructor(private waterQualityService: WaterQualityService) {}

  ngOnInit() {
    this.waterQualityService.getWaterQualityData().subscribe(
      data => this.waterQualityData = data
    );
  }

  calculatePhGaugeOffset(): number {
    const phValue = this.waterQualityData?.phLevel || 7;
    const maxCircumference = 283;
    const normalizedOffset = ((14 - phValue) / 14) * maxCircumference;
    return normalizedOffset;
  }

  calculateWaterQualityGaugeOffset(): number {
    const qualityIndex = this.waterQualityData?.waterQualityIndex || 0;
    const maxCircumference = 283;
    return maxCircumference - ((qualityIndex / 100) * maxCircumference);
  }
}