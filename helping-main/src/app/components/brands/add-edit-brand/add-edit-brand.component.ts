import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brand';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrl: './add-edit-brand.component.css'
})
export class AddEditBrandComponent {
  addEditBrand!:FormGroup;
  brandId=0;
  rutaLogo:string="";
  base64Logo:any=null;
  archivoLogo:any=null;

  constructor (private brandService: BrandService, private formBuilder: FormBuilder, 
              private router: Router, private activatedRoute:ActivatedRoute,
              private snackBar: MatSnackBar){}

  ngOnInit(){
    this.creaFormulario();
  }

  creaFormulario(){
    this.addEditBrand = this.formBuilder.group({
      id:[""],
      name:["", [Validators.required, Validators.minLength(2)]],
      country:["", [Validators.required, Validators.minLength(3)]],
      fundationYear:["", [Validators.required]],
      active:[""]
    });

    this.brandId= parseInt( this.activatedRoute.snapshot.params["id"] );
    if (this.brandId==undefined || Number.isNaN(this.brandId)) {
      //Cuando estamos insertando
      this.brandId=0;
    }

    if (this.brandId>0) {
      //Cuando estamos actualizando
      this.brandService.getBrand(this.brandId).subscribe({
        next:(data:Brand)=>{
          this.addEditBrand.get("id")?.setValue(data.id);
          this.addEditBrand.get("name")?.setValue(data.name);
          this.addEditBrand.get("country")?.setValue(data.country);
          this.addEditBrand.get("fundationYear")?.setValue(data.fundationYear);
          this.addEditBrand.get("active")?.setValue(data.active);
          this.base64Logo = "data:image/jpeg;base64,"+data.logo;
        }
      })
    }

  }


  grabarLogo(idBrand: number) {
    const logoData = new FormData();
    logoData.append("logo",this.archivoLogo, this.rutaLogo);
    this.brandService.editarLogo(idBrand,logoData).subscribe({
      next:()=>{
        this.snackBar.open("Logotipo cargado correctamente","OK",{duration:500});
      },
      error:(err) => {
        console.log(err);
      }
    });
  }

  grabarBrand(){
    const brand: Brand={
      id:this.addEditBrand.get("id")?.value,
      name:this.addEditBrand.get("name")?.value,
      country: this.addEditBrand.get("country")?.value,
      fundationYear: this.addEditBrand.get("fundationYear")?.value,
      active: this.addEditBrand.get("active")?.value,
      logo:null
    }

    if (this.brandId==0) {
      this.brandService.insertBrand(brand).subscribe({
        next:(data:Brand)=> {
          if (this.archivoLogo!=null) {
            this.grabarLogo(data.id);
          }          
          
          
          
          this.router.navigate(["/brand-list"]);
          this.snackBar.open("Se registró correctamente la marca","OK",{duration:2000});
        },
        error:(err)=> {
          this.snackBar.open("Hubo un error en el registro de la marca","OK",{duration:2000});
          console.log(err);
        }
      })
 
    } else {
      this.brandService.editarBrand(brand).subscribe({
        next:(data)=> {


          if (this.archivoLogo!=null) {
            this.grabarLogo(data.id);
          }          
          

          this.router.navigate(["/brand-list"]);
          this.snackBar.open("Se actualizó correctamente la marca","OK",{duration:2000});
        },
        error:(err)=> {
          this.snackBar.open("Hubo un error en la actualización de la marca","OK",{duration:2000});
          console.log(err);
        }
      })
    }
    

  }


  actualizaLogo(event:any) {
    this.archivoLogo = event.target.files[0];
    //console.log(this.archivoLogo);
    if (this.archivoLogo) {
      this.rutaLogo = this.archivoLogo.name;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.archivoLogo);
      fileReader.onload=()=>{
        this.base64Logo = fileReader.result as string;
        //console.log(this.base64Logo);
      }
      
    }
    
    
    
  }

}
