import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterQualityService } from '../../services/water-quality.service';
import { WaterQualityData } from '../../models/water-quality.model';

@Component({
  selector: 'app-water-quality-dashboard',
  standalone: true,
  imports: [CommonModule],
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
    const maxCircumference = 251.2; // 2πr where r=40
    
    // Map pH scale (0-14) to gauge progress (0-100%)
    const percentage = (phValue / 14);
    
    // Calculate the offset - for a complete circle with proper filling
    return maxCircumference * (1 - percentage);
  }

  calculateWaterQualityGaugeOffset(): number {
    const qualityIndex = this.waterQualityData?.waterQualityIndex || 0;
    const maxCircumference = 251.2; // 2πr where r=40
    
    // Calculate the offset for quality percentage
    return maxCircumference * (1 - (qualityIndex / 100));
  }
}