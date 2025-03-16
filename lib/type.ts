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

export type Status = {
    value: '' | 'pending' | 'completed';
}

export type ComponentProps = {
    searchParams?: { 
        search?: string 
        status?: Status['value']
        sort?: string
        page?: number
    };
}

export type PaginationProps = {
    links: {
        url: string;
        label: string;
        active: boolean;
    }[]
}