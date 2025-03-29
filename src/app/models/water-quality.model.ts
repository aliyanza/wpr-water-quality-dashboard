export interface WaterQualityData {
  phLevel: number;
  waterQualityIndex: number;
  timestamp: Date;
}

export interface FirebaseSensorsData {
  pH: number;
  TDS: number;
}