import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CarReport } from '../models/car_report';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  ruta_servidor:string ="http://localhost:8080/api";
  recurso:string ="cars";
  

  constructor(private http: HttpClient) { }


  getCars(){
    return this.http.get<Car[]>(this.ruta_servidor + "/" + this.recurso);
  }

  getCarsReport(){
    return this.http.get<CarReport[]>(this.ruta_servidor + "/" + this.recurso+"/"+"report");
  }

  getCar(id:number){
    return this.http.get<Car>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString());
  }

  editarCar(car:Car){
    return this.http.put<Car>(this.ruta_servidor + "/" + this.recurso+"/"+car.id.toString(),car)
  }

  deleteCar(id:number){
    return this.http.delete<Car>(this.ruta_servidor + "/" + this.recurso+"/"+id.toString())
  }

  insertCar(car:Car){
    return this.http.post<Car>(this.ruta_servidor + "/" + this.recurso,car);
  }

}
