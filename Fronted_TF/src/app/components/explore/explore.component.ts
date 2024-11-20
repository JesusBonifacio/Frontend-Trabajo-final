import { Component } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/Campaign';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent {
  campaigns: Campaign[] = [];
  constructor(private campaignsService: CampaignService) { }
  ngOnInit() {
    this.getCampains();
  }
  getCampains() {
    this.campaignsService.getCampaigns().subscribe(
      (data: Campaign[]) => {
        this.campaigns = data;
      }
    )
  }
}
