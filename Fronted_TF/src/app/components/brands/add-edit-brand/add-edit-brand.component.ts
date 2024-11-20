import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CampaignService } from '../../../services/campaign.service';
import { Campaign } from '../../../models/Campaign';

@Component({
  selector: 'app-add-edit-brand',
  templateUrl: './add-edit-brand.component.html',
  styleUrl: './add-edit-brand.component.css'
})
export class AddEditBrandComponent {
  myForm!: FormGroup;
  campaignName: string = '';
  rutaLogo: string = "";
  base64Logo: any = null;
  id: number = 0;
  archivoLogo: any = null;

  constructor(private campaignService: CampaignService, private formBuilder: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.creaFormulario();
  }

  creaFormulario() {
    this.myForm = this.formBuilder.group({
      campName: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(3)]],
      moneyGoal: ["", [Validators.required]],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required]
    });

    this.campaignName = this.activatedRoute.snapshot.params["name"];
    if (this.campaignName) {
      this.campaignService.getCampaignByName(this.campaignName).subscribe({
        next: (data: Campaign[]) => {
          console.log(data[0])
          this.id = data[0].id;
          this.myForm.get("campName")?.setValue(data[0].campName);
          this.myForm.get("description")?.setValue(data[0].description);
          this.myForm.get("moneyGoal")?.setValue(data[0].moneyGoal);
          this.myForm.get("startDate")?.setValue(data[0].startDate);
          this.myForm.get("endDate")?.setValue(data[0].endDate);
        }
      })
    }

  }
  grabarBrand() {
    if (!this.campaignName) {
      this.campaignService.insertCampaign(this.myForm.value).subscribe({
        next: (data: Campaign) => {
          this.router.navigate(["/campaign-list"]);
          this.snackBar.open("Se registró correctamente la campaña", "OK", { duration: 2000 });
        },
        error: (err) => {
          this.snackBar.open("Hubo un error en el registro de la campaña", "OK", { duration: 2000 });
          console.log(err);
        }
      })
    } else {
      this.campaignService.insertCampaign({ ...this.myForm.value, id: this.id }).subscribe({
        next: (data) => {
          this.router.navigate(["/campaign-list"]);
          this.snackBar.open("Se actualizó correctamente la campaña", "OK", { duration: 2000 });
        },
        error: (err) => {
          this.snackBar.open("Hubo un error en la actualización de la campaña", "OK", { duration: 2000 });
          console.log(err);
        }
      })
    }


  }


  actualizaLogo(event: any) {
    this.archivoLogo = event.target.files[0];
    //console.log(this.archivoLogo);
    if (this.archivoLogo) {
      this.rutaLogo = this.archivoLogo.name;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.archivoLogo);
      fileReader.onload = () => {
        this.base64Logo = fileReader.result as string;
        //console.log(this.base64Logo);
      }

    }



  }

}
