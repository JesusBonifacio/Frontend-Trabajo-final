// src/app/components/details/details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/Campaign';
import { Donation } from '../../models/Donation';
import { Comment } from '../../models/Comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  campaign: Campaign | undefined;
  newComment: Comment = { id: 0, comment_text: '', comment_date: '' };
  newDonation: Donation = { id: 0, moneyAmount: 0, donationDate: '' };
  formComment!: FormGroup;
  comments?: Comment[] = [];
  formDonate!: FormGroup;
  constructor(
    private campaignService: CampaignService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCampaign();
    this.cargarFormComment();
  }
  cargarFormComment() {
    this.formComment = this.formBuilder.group({
      description: ["", [Validators.required]]
    });
  }
  getCampaign(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.campaignService.getCampaignByName(name).subscribe(
        (data: Campaign[]) => {
          console.log(data)
          this.campaign = data[0];
        },
        (error) => {
          console.error('Error al obtener la campaña', error);
        }
      );
    }
  }

  // Método para agregar un comentario
  addComment(): void {

    if (this.campaign) {
      console.log(this.campaign.id)
      const comment: Comment = {
        id: 0,
        comment_date: new Date().toDateString(),
        comment_text: this.formComment.get('description')?.value,
        campaign: { id: this.campaign.id },
      }
      console.log(comment)
      this.campaignService.addComment(comment).subscribe(
        (comment: Comment) => {
          this.getCampaign();
        }
      )

    }
  }

  makeDonation(): void {
    if (this.campaign && this.newDonation.moneyAmount > 0) {
      this.newDonation.donationDate = new Date().toISOString(); // Asigna la fecha actual
      // Puedes asignar el Donor aquí si tienes la información del usuario autenticado
      this.campaignService.makeDonation(this.campaign.id, this.newDonation).subscribe(
        (donation: Donation) => {
          if (this.campaign && this.campaign.donations) {
            this.campaign.donations.push(donation);
          }
          this.newDonation = { id: 0, moneyAmount: 0, donationDate: '' }; // Reinicia el formulario
        },
        (error) => {
          console.error('Error al realizar la donación', error);
        }
      );
    }
  }
}
