import { Comment } from "./Comment";
import { Donation } from "./Donation";

// src/app/models/campaign.ts
export interface Campaign {
    id: number;
    campName: string;
    description: string;
    moneyGoal: number;
    startDate: string;
    endDate: string;
    //organization?: Organization; // Opcional, dependiendo de tus necesidades
    //category?: Category;         // Opcional
    comments?: Comment[];
    donations?: Donation[];
}
