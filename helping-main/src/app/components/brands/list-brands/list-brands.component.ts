import { Brand } from './../../../models/brand';
import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { BrandService } from '../../../services/brand.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrl: './list-brands.component.css'
})
export class ListBrandsComponent {

  dsBrands = new MatTableDataSource<Brand>();
  displayedColumns:string[]=['id','logo','name','country','fundationYear','antiguedad','active','opciones'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsBrands.filter = filterValue.trim().toLowerCase();
  }

  constructor(private brandService: BrandService, private dialog: MatDialog ) {}

  ngOnInit(){
    this.cargarBrands();
  }

  eliminarBrand(id:number){
    
    let dialogRef = this.dialog.open(ConfirmarEliminarComponent);
    
    dialogRef.afterClosed().subscribe(
    respuestaSeleccionada=> {
      if (respuestaSeleccionada) {
        this.brandService.deleteBrand(id).subscribe({
          next:(data) => {
            this.cargarBrands();
          },
          error: (err)=>  {
            console.log(err);
          }
        })
      }      
    }      
    )
  }

  calculaAntiguedad(fundationYear: number){
    return new Date().getFullYear()-fundationYear;
  }

  cargarBrands() {

    //dsBrands = this.brandService.getBrands();

    this.brandService.getBrands().subscribe({
      next: (data:Brand[]) => {
        

        data.forEach((brand:Brand)=>{
          brand.logo = "data:image/jpeg;base64," + brand.logo;
        })

        this.dsBrands = new MatTableDataSource(data);
      },
      error: (err)=>  {
        console.log(err);
      }
    })

  }


}
