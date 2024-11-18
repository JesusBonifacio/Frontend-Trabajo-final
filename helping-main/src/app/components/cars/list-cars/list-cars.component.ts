import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CarReport } from '../../../models/car_report';
import { CarService } from '../../../services/car.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';

@Component({
  selector: 'app-list-cars',
  templateUrl: './list-cars.component.html',
  styleUrl: './list-cars.component.css'
})
export class ListCarsComponent {
  dsCars = new MatTableDataSource<CarReport>();
  displayedColumns:string[]=['id','brandName','modelName','license','fabricationYear',
    'antiguedad','salePrice','purchaseDate','estado','opciones'];

    constructor(private carService: CarService, private dialog: MatDialog ) {}

    ngOnInit(){
      this.cargarAutos();
    }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsCars.filter = filterValue.trim().toLowerCase();
  }

  calculaAntiguedad(fundationYear: number){
    let antiguedad=new Date().getFullYear()-fundationYear;
    if (antiguedad<=1) {
      return antiguedad + " año";
    }
    return antiguedad + " años";
    
  }

  eliminarAuto(id: number){
    let dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    
    dialogRef.afterClosed().subscribe(
    respuestaSeleccionada=> {
      if (respuestaSeleccionada) {
        this.carService.deleteCar(id).subscribe({
          next:(data) => {
            this.cargarAutos();
          },
          error: (err)=>  {
            console.log(err);
          }
        })
      }      
    }      
    )
  }


  cargarAutos() {

 
    this.carService.getCarsReport().subscribe({
      next: (data:CarReport[]) => {
        this.dsCars = new MatTableDataSource(data);
      },
      error: (err)=>  {
        console.log(err);
      }
    })

  }
}
