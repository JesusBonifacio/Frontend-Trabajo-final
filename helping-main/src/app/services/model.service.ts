import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  ruta_servidor:string ="http://localhost:8080/api";
  recurso:string ="models";
  

  constructor(private http: HttpClient) { }

  
  getModels(){
    return this.http.get<Model[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getModelsByBrandId(brandId: number){
    return this.http.get<Model[]>(this.ruta_servidor + "/" + this.recurso + "/" +"brand" +"/" + brandId.toString());
  }

  getModel(id:number){
    return this.http.get<Model>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarModel(model:Model){
    return this.http.put<Model>(this.ruta_servidor + "/" + this.recurso+"/"+model.id.toString(),model)
  }

  deleteModel(id:number){
    return this.http.delete<Model>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertModel(model:Model){
    return this.http.post<Model>(this.ruta_servidor + "/" + this.recurso,model);
  }

}
