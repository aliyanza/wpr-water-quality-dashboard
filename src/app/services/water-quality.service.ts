
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { WaterQualityData } from '../models/water-quality.model';

@Injectable({
  providedIn: 'root'
})
export class WaterQualityService {
  constructor(private http: HttpClient) {}

  // Método para obtener datos de calidad del agua
  getWaterQualityData(): Observable<WaterQualityData> {
    // En una aplicación real, esto sería una llamada a un API
    return of({
      phLevel: 7.2,
      waterQualityIndex: 85,
      timestamp: new Date()
    });
  }
}