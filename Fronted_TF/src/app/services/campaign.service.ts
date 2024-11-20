import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaign } from '../models/Campaign';
import { Observable } from 'rxjs';
import { Donation } from '../models/Donation';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  ruta_servidor: string = "http://localhost:8080/helpinghands";
  private apiUrl = 'http://localhost:8080/helpinghands';
  constructor(private http: HttpClient) { }
  getCampaigns() {
    return this.http.get<Campaign[]>(this.ruta_servidor + '/campaigns');
  }

  getCampaignReport() {
    return this.http.get<Campaign[]>(this.ruta_servidor);
  }

  getCampaignByName(name: String) {
    return this.http.get<Campaign[]>(this.ruta_servidor + "/campaigns/" + name);
  }

  editarCampaign(campaign: Campaign) {
    return this.http.put<Campaign>(this.ruta_servidor + "/" + campaign.id.toString(), campaign)
  }

  deleteCampaign(id: number) {
    return this.http.delete<Campaign>(this.ruta_servidor + "/campaigns/" + id.toString())
  }

  insertCampaign(campaign: Campaign) {
    return this.http.post<Campaign>(this.ruta_servidor, campaign);
  }



  // Obtener campaña por ID
  getCampaignById(id: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.apiUrl}/campaigns/id/${id}`);
    // Asegúrate de que el backend tenga este endpoint
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, comment);
  }

  makeDonation(campaignId: number, donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${this.apiUrl}/campaigns/${campaignId}/donations`, donation);
  }
}
