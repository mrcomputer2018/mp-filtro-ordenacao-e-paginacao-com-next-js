export type Order = {
    id: number;
    customer_name: string;
    custumer_email: string;
    order_date: Date;
    amount_in_cents: number;
    status: string;
    created_at: Date;
    updated_at: Date;
}