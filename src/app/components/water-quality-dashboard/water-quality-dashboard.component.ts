import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaterQualityService } from '../../services/water-quality.service';
import { WaterQualityData } from '../../models/water-quality.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-water-quality-dashboard',
  standalone: true,
  imports: [CommonModule],
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
    
    // Verificar el estado de conexión
    this.checkConnectionStatus();
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
  }
  
  private checkConnectionStatus(): void {
    // Consultamos el nodo "test/connection" cada 10 segundos
    this.connectionSubscription = this.waterQualityService.getConnectionStatus().subscribe(
      status => {
        this.connectionStatus = status || 'Desconectado';
      }
    );
  }

  calculatePhGaugeOffset(): number {
    const phValue = this.waterQualityData?.phLevel || 7;
    const maxCircumference = 251.2; // 2πr donde r=40
    
    // Mapear escala pH (0-14) a progreso del medidor (0-100%)
    const percentage = (phValue / 14);
    
    // Calcular el desplazamiento para un círculo completo con llenado adecuado
    return maxCircumference * (1 - percentage);
  }

  calculateWaterQualityGaugeOffset(): number {
    const qualityIndex = this.waterQualityData?.waterQualityIndex || 0;
    const maxCircumference = 251.2; // 2πr donde r=40
    
    // Calcular el desplazamiento para el porcentaje de calidad
    // Para TDS, generalmente 0-1000 es el rango, pero podemos ajustarlo según tus necesidades
    const maxTDS = 1000;
    const percentage = Math.min(qualityIndex / maxTDS, 1);
    
    return maxCircumference * (1 - percentage);
  }
}