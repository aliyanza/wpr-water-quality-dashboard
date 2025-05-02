import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // 👈 IMPORTANTE
import { routes } from './app.routes'; // 👈 tus rutas

import { AppComponent } from './app.component';
import { WaterQualityDashboardComponent } from './components/water-quality-dashboard/water-quality-dashboard.component';
import { InfoPageComponent } from './components/info-page/info-page.component'; // 👈 NO OLVIDES IMPORTAR ESTE COMPONENTE

@NgModule({
  declarations: [
    AppComponent,
    WaterQualityDashboardComponent,
    InfoPageComponent // 👈 Agrégalo aquí también
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes) // 👈 Esto conecta el router
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
