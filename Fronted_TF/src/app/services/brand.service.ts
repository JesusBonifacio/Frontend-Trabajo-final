import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../models/brand';
import { BrandSummary } from '../models/brand_summary';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  ruta_servidor:string ="http://localhost:8080/api";
  recurso:string ="brands";
  
  constructor(private http: HttpClient) { }

  getBrands(){
    return this.http.get<Brand[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getBrandsSummary(){
    return this.http.get<BrandSummary[]>(this.ruta_servidor + "/" + this.recurso +"/"+"summary");
  }

  getBrand(id:number){
    return this.http.get<Brand>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarBrand(brand:Brand){
    return this.http.put<Brand>(this.ruta_servidor + "/" + this.recurso+"/"+brand.id.toString(),brand)
  }

  editarLogo(idBrand: number, logoData: FormData){
    return this.http.put<Brand>(this.ruta_servidor + "/" + this.recurso+"/"+idBrand.toString()+"/"+"logo",logoData)
  }

  deleteBrand(id:number){
    return this.http.delete<Brand>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertBrand(brand:Brand){
    console.log(brand);    
    return this.http.post<Brand>(this.ruta_servidor + "/" + this.recurso,brand);
  }




}
