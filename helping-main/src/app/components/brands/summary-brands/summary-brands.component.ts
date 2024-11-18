import { Component } from '@angular/core';
import { ChartPoint } from '../../../models/chart_point';
import { BrandService } from '../../../services/brand.service';
import { BrandSummary } from '../../../models/brand_summary';

@Component({
  selector: 'app-summary-brands',
  templateUrl: './summary-brands.component.html',
  styleUrl: './summary-brands.component.css'
})
export class SummaryBrandsComponent {
  datosVenta:ChartPoint[]=[];


  constructor (private brandService: BrandService){}

  ngOnInit(){
    this.cargaGrafico();
  }

  cargaGrafico(){
    this.brandService.getBrandsSummary().subscribe({
      next: (data:BrandSummary[]) => {

          this.datosVenta = [];
          data.forEach((bs:BrandSummary)=>{
            const punto:ChartPoint={
              name:bs.brandName,
              value:bs.countSales
            }
            this.datosVenta.push(punto);

          })

      },
      error:(err)=>{
        console.log(err);
      } 

    })
  }

}
