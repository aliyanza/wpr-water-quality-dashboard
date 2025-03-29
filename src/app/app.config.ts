import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(), provideFirebaseApp(() => initializeApp({ projectId: "wprsystem", appId: "1:447761406223:web:c4ec4ac55d84a89aef067a", databaseURL: "https://wprsystem-default-rtdb.firebaseio.com", storageBucket: "wprsystem.firebasestorage.app", apiKey: "AIzaSyC1QSQecf7Y1xkYZHK9E0M9OIw2bskhG-Y", authDomain: "wprsystem.firebaseapp.com", messagingSenderId: "447761406223", measurementId: "G-TE31F8X0RD" })), provideDatabase(() => getDatabase()) // Añade esta línea para habilitar HttpClient
  ]
};