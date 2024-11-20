import { Campaign } from "./Campaign";
import { Donor } from "./Donor";

export interface Comment {
    id?: number;
    comment_text: string;
    comment_date: string;
    donor?: Donor;
    campaign?: any;
}