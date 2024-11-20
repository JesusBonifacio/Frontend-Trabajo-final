import { Campaign } from "./Campaign";
import { Donor } from "./Donor";

// src/app/models/donation.ts
export interface Donation {
    id: number;
    moneyAmount: number;
    donationDate: string;
    //donationStatus?: DonationStatus; 
    // donationPayment?: Payment;       
    donor?: Donor;
    campaign?: Campaign;
}
