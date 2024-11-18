import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { HomeComponent } from './components/home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ListBrandsComponent } from './components/brands/list-brands/list-brands.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddEditBrandComponent } from './components/brands/add-edit-brand/add-edit-brand.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { ConfirmarEliminarComponent } from './components/confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { ListCarsComponent } from './components/cars/list-cars/list-cars.component';
import { AddEditCarComponent } from './components/cars/add-edit-car/add-edit-car.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { AutorizacionInterceptor } from './interceptors/autorizacion.interceptor';
import { ConsultaGuard } from './guards/consulta.guard';
import { LogeadoGuard } from './guards/logeado.guard';
import { RegistroGuard } from './guards/registro.guard';
import { SummaryBrandsComponent } from './components/brands/summary-brands/summary-brands.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    HomeComponent,
    ListBrandsComponent,
    AddEditBrandComponent,
    ConfirmarEliminarComponent,
    ListCarsComponent,
    AddEditCarComponent,
    LoginComponent,
    SummaryBrandsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxChartsModule    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: HTTP_INTERCEPTORS, useClass:AutorizacionInterceptor, multi:true },
    ConsultaGuard,
    LogeadoGuard,
    RegistroGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
