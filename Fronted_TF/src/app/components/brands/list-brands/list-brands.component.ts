import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminarComponent } from '../../confirmaciones/confirmar-eliminar/confirmar-eliminar.component';
import { CampaignService } from '../../../services/campaign.service';
import { Campaign } from '../../../models/Campaign';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrl: './list-brands.component.css'
})
export class ListBrandsComponent {

  dsCampaigns = new MatTableDataSource<Campaign>();
  displayedColumns: string[] = ['campName', 'description', 'moneyGoal', 'startDate', 'endDate', 'options'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsCampaigns.filter = filterValue.trim().toLowerCase();
  }

  constructor(private campaignService: CampaignService, private dialog: MatDialog) { }

  ngOnInit() {
    this.cargarCampaigns();
  }

  eliminarBrand(id: number) {

    let dialogRef = this.dialog.open(ConfirmarEliminarComponent);

    dialogRef.afterClosed().subscribe(
      respuestaSeleccionada => {
        if (respuestaSeleccionada) {
          this.campaignService.deleteCampaign(id).subscribe({
            next: (data) => {
              this.cargarCampaigns();
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
    )
  }

  cargarCampaigns() {
    this.campaignService.getCampaigns().subscribe({
      next: (data: Campaign[]) => {
        this.dsCampaigns = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
