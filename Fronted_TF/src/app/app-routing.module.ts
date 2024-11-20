import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBrandsComponent } from './components/brands/list-brands/list-brands.component';
import { HomeComponent } from './components/home/home.component';
import { AddEditBrandComponent } from './components/brands/add-edit-brand/add-edit-brand.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultaGuard } from './guards/consulta.guard';
import { RegistroGuard } from './guards/registro.guard';
import { LogeadoGuard } from './guards/logeado.guard';
import { RegisterComponent } from './components/register/register.component';
import { ExploreComponent } from './components/explore/explore.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "home", component: HomeComponent },
  { path: "campaign-list", component: ListBrandsComponent },
  { path: "compaign-add", component: AddEditBrandComponent, },
  { path: "compaign-edit/:name", component: AddEditBrandComponent, },
  { path: "explore", component: ExploreComponent, },
  { path: "details/:name", component: DetailsComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
