import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBrandsComponent } from './components/brands/list-brands/list-brands.component';
import { HomeComponent } from './components/home/home.component';
import { AddEditBrandComponent } from './components/brands/add-edit-brand/add-edit-brand.component';
import { ListCarsComponent } from './components/cars/list-cars/list-cars.component';
import { AddEditCarComponent } from './components/cars/add-edit-car/add-edit-car.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultaGuard } from './guards/consulta.guard';
import { RegistroGuard } from './guards/registro.guard';
import { LogeadoGuard } from './guards/logeado.guard';
import { SummaryBrandsComponent } from './components/brands/summary-brands/summary-brands.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [LogeadoGuard] },
  { path: "brand-list", component: ListBrandsComponent, canActivate: [ConsultaGuard] },
  { path: "brand-summary", component: SummaryBrandsComponent, canActivate: [ConsultaGuard] },
  { path: "brand-add", component: AddEditBrandComponent, canActivate: [RegistroGuard] },
  { path: "brand-edit/:id", component: AddEditBrandComponent, canActivate: [RegistroGuard] },
  { path: "car-list", component: ListCarsComponent, canActivate: [ConsultaGuard] },
  { path: "car-add", component: AddEditCarComponent, canActivate: [RegistroGuard] },
  { path: "car-edit/:id", component: AddEditCarComponent, canActivate: [RegistroGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
