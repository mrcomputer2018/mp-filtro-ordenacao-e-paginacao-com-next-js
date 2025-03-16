'use client'; // event handler e hooks 

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from './ui/badge';
import { ChevronsUpDown } from 'lucide-react';

import type { Order } from '@/lib/type';
import { use } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const intl = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
});

export default function OrdersTable({ orders } : { orders: Order[] }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    function handleClick(key: string) {
        const params = new URLSearchParams(searchParams.toString());
        
        // crescente
        if (params.get('sort') === key) {
            params.set('sort', `-${key}`);
        }
        // decrescente
        else if (params.get('sort') === `-${key}`) {
            params.delete('sort');
        } else if(key) {
            params.set('sort', key);
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="w-full">
                    <TableHead className="table-cell">Cliente</TableHead>
                    <TableHead className="table-cell">Status</TableHead>

                    <TableHead 
                        className="table-cell cursor-pointer justify-end items-center gap-1"
                        onClick={() => handleClick('order_date')}
                    >
                        <div className="flex items-center gap-1">
                            Data
                            <ChevronsUpDown className="w-4" />
                        </div>
                    </TableHead>

                    <TableHead 
                        className="text-right cursor-pointer flex justify-end items-center gap-1"
                        onClick={() => handleClick('amount_in_cents')}    
                    >
                        Valor
                        <ChevronsUpDown className="w-4" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>
                            <div className="font-medium">{order.customer_name}</div>
                            <div className="hidden md:inline text-sm text-muted-foreground">
                                {order.custumer_email}
                            </div>
                        </TableCell>

                        <TableCell>
                            <Badge className={`text-xs`} variant="outline">
                                {order.status === 'pending' ? 'Pendente' : 'Completo'}
                            </Badge>
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                            {order.order_date.toString()}
                        </TableCell>
                        <TableCell className="text-right">
                            { intl.format(order.amount_in_cents * 0.100) }
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
