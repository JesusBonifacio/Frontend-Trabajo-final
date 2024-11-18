import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModelService } from '../../../services/model.service';
import { CarService } from '../../../services/car.service';
import { Brand } from '../../../models/brand';
import { Model } from '../../../models/model';
import { Car } from '../../../models/car';

@Component({
  selector: 'app-add-edit-car',
  templateUrl: './add-edit-car.component.html',
  styleUrl: './add-edit-car.component.css'
})
export class AddEditCarComponent {
  addEditCar!:FormGroup;
  brands!:Brand[];
  models!:Model[];
  carId=0;


  constructor (private brandService: BrandService, private formBuilder: FormBuilder, 
    private router: Router, private activatedRoute:ActivatedRoute,
    private snackBar: MatSnackBar, private modelService: ModelService, private carService: CarService){}



  ngOnInit(){
    this.creaFormulario();
  }


  creaFormulario(){

    this.brandService.getBrands().subscribe({
      next:(data:Brand[])=>{
        this.brands = data;
      }
    });

    this.addEditCar = this.formBuilder.group({
      id:[""],
      license:["", [Validators.required, Validators.minLength(3)]],
      salePrice:["", [Validators.required, Validators.minLength(3)]],
      fabricationYear:["", [Validators.required]],
      purchaseDate:[""],
      model_id:[""],
      customer_id:[""],
      brand_id:[""]
    });

    this.carId= parseInt(this.activatedRoute.snapshot.params["id"]);
    if (this.carId==undefined || Number.isNaN(this.carId)) {
      //Cuando estamos insertando
      this.carId=0;
    }

    if (this.carId>0) {
      //Cuando estamos actualizando
      this.carService.getCar(this.carId).subscribe({
        next:(dataCar:Car)=>{
          //console.log( data);
          this.addEditCar.get("id")?.setValue(dataCar.id);
          this.addEditCar.get("license")?.setValue(dataCar.license);
          this.addEditCar.get("salePrice")?.setValue(dataCar.salePrice);
          this.addEditCar.get("fabricationYear")?.setValue(dataCar.fabricationYear);
          
          if (dataCar.purchaseDate!=null) {
            this.addEditCar.get("purchaseDate")?.setValue(dataCar.purchaseDate+"T00:00:00");
          }
          

          this.modelService.getModel(dataCar.modelId).subscribe({
            next:(dataModel:Model) => {
              //console.log(dataModel);
              
              this.addEditCar.get("brand_id")?.setValue(dataModel.brandId);
              this.modelService.getModelsByBrandId(dataModel.brandId).subscribe({
                next:(dataModels:Model[])=>{
                  this.models = dataModels;
                  this.addEditCar.get("model_id")?.setValue(dataModel.id);
                }
              })


            }
          })
        }
      })
    }
  }



  cargarModelos(event:any){
    let brand_id:number = event.value;
    this.modelService.getModelsByBrandId(brand_id).subscribe({
      next:(data:Model[])=>{
        this.models=data;
      }
    })
  }




  grabarCar(){
    
    const car: Car={
      id:this.carId,
      license:this.addEditCar.get("license")?.value,
      salePrice: this.addEditCar.get("salePrice")?.value,
      fabricationYear: this.addEditCar.get("fabricationYear")?.value,
      purchaseDate: this.addEditCar.get("purchaseDate")?.value,
      modelId: this.addEditCar.get("model_id")?.value,
      customerId: 0
    }

    if (this.carId==0) {
      //Cuando estamos insertando
      this.carService.insertCar(car).subscribe({
        next:(data)=> {
          this.router.navigate(["/car-list"]);
          this.snackBar.open("Se registró correctamente el auto","OK",{duration:2000});
        },
        error:(err)=> {
          this.snackBar.open("Hubo un error en el registro del auto","OK",{duration:2000});
          console.log(err);
        }
      })
    } else {
      //Cuando estamos actualizando
      this.carService.editarCar(car).subscribe({
        next:(data)=> {
          this.router.navigate(["/car-list"]);
          this.snackBar.open("Se actualizó correctamente el auto","OK",{duration:2000});
        },
        error:(err)=> {
          this.snackBar.open("Hubo un error en la actualización del auto","OK",{duration:2000});
          console.log(err);
        }
      })
    }



  }



}
