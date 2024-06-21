import { CustomerProps } from "./customer.types";

export interface TicketProps{
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: Date | null;
    updated_at: Date | null;
    customerId: string;
    userId: string | null;
    customer: CustomerProps | null;
}