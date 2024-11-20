import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListBrandsComponent } from './components/brands/list-brands/list-brands.component';
import { AddEditBrandComponent } from './components/brands/add-edit-brand/add-edit-brand.component';
import { ConfirmarEliminarComponent } from './components/confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { LoginComponent } from './components/login/login.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, NativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AutorizacionInterceptor } from './interceptors/autorizacion.interceptor';
import { ConsultaGuard } from './guards/consulta.guard';
import { LogeadoGuard } from './guards/logeado.guard';
import { RegistroGuard } from './guards/registro.guard';
import { ExploreComponent } from './components/explore/explore.component';
import { DetailsComponent } from './components/details/details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEditBrandComponent,
    ListBrandsComponent,
    AddEditBrandComponent,
    ConfirmarEliminarComponent,
    // AddEditCarComponent,
    LoginComponent,
    ToolbarComponent,
    RegisterComponent,
    ExploreComponent,
    ToolbarComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    NativeDateModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: HTTP_INTERCEPTORS, useClass: AutorizacionInterceptor, multi: true },
    ConsultaGuard,
    LogeadoGuard,
    RegistroGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
