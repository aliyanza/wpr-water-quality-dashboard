import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { WaterQualityData } from '../models/water-quality.model';

@Injectable({
  providedIn: 'root'
})
export class WaterQualityService {
  private apiUrl = 'https://wprsystem-default-rtdb.firebaseio.com';
  private waterQualitySubject = new BehaviorSubject<WaterQualityData>({
    phLevel: 7.0,
    waterQualityIndex: 0,
    timestamp: new Date()
  });
  private connectionStatusSubject = new BehaviorSubject<string>('Desconectado');

  constructor(private http: HttpClient) {
    this.initRealtimeUpdates();
  }

  // Método para iniciar actualizaciones en tiempo real
  private initRealtimeUpdates(): void {
    // Usar EventSource para la conexión SSE (Server-Sent Events) de sensores
    const sensoresEventSource = new EventSource(`${this.apiUrl}/sensores.json`);
    
    sensoresEventSource.addEventListener('put', (event) => {
      const data = JSON.parse(event.data);
      if (data.path === '/' && data.data) {
        const phValue = data.data.pH || 7.0;
        const tdsValue = data.data.TDS || 0;
        
        this.waterQualitySubject.next({
          phLevel: phValue,
          waterQualityIndex: tdsValue,
          timestamp: new Date()
        });
      }
    });

    // EventSource para el estado de conexión
    const connectionEventSource = new EventSource(`${this.apiUrl}/test/connection.json`);
    
    connectionEventSource.addEventListener('put', (event) => {
      const data = JSON.parse(event.data);
      if (data.data) {
        this.connectionStatusSubject.next(data.data);
      }
    });

    // Realizar solicitudes iniciales para obtener los datos actuales
    this.fetchCurrentData();
    this.fetchConnectionStatus();
  }

  // Método para obtener los datos actuales
  private fetchCurrentData(): void {
    this.http.get(`${this.apiUrl}/sensores.json`).subscribe((data: any) => {
      if (data) {
        const phValue = data.pH || 7.0;
        const tdsValue = data.TDS || 0;
        
        this.waterQualitySubject.next({
          phLevel: phValue,
          waterQualityIndex: tdsValue,
          timestamp: new Date()
        });
      }
    });
  }

  // Método para obtener el estado de conexión actual
  private fetchConnectionStatus(): void {
    this.http.get(`${this.apiUrl}/test/connection.json`).subscribe((data: any) => {
      if (data) {
        this.connectionStatusSubject.next(data);
      }
    });
  }

  // Método público para obtener datos de calidad del agua
  getWaterQualityData(): Observable<WaterQualityData> {
    return this.waterQualitySubject.asObservable();
  }
  
  // Método público para obtener el estado de conexión
  getConnectionStatus(): Observable<string> {
    return this.connectionStatusSubject.asObservable();
  }
}