'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationProps } from '@/lib/type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ links }: PaginationProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleClickPage(pageNumber: number) {

        const params = new URLSearchParams(searchParams.toString());

        if(pageNumber > 1) {
            params.set('page', pageNumber.toString());
        }
        else {
            params.delete('page');
        }

        if(pageNumber > 30) {
            return;
        }

        replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <PaginationComponent>
            <PaginationContent>
                <PaginationItem
                className={`${links[0].url ? 'cursor-pointer' : 'cursor-auto text-slate-300'}`} 
                onClick={
                    () => handleClickPage(searchParams.get('page') ? parseInt(searchParams.get('page') as string) - 1 : 1)
                }>
                    <PaginationPrevious />
                </PaginationItem>

                {links.map(
                    (link: any, index: number) => {

                        if(link.label === 'Próximo &raquo;' || link.label === '&laquo; Anterior') {
                            return null
                        }

                        return (
                            <PaginationItem key={index} className="hidden md:inline-flex">
                                <PaginationLink 
                                    className='cursor-pointer w-auto py-1 px-3 mx-1'
                                    onClick={ () => handleClickPage(parseInt(link.label)) }
                                    isActive={link.active}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                >
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                )}

                <PaginationItem 
                className={`${links[links.length -1].url ? 'cursor-pointer' : 'cursor-auto text-slate-300'}`}
                onClick={
                    () => handleClickPage(searchParams.get('page') ? parseInt(searchParams.get('page') as string) + 1 : 30)
                }>
                    <PaginationNext />
                </PaginationItem>

                {/* <PaginationItem>
                    <PaginationPrevious />
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationLink isActive={true}>1</PaginationLink>
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationLink>2</PaginationLink>
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationLink>3</PaginationLink>
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationLink>8</PaginationLink>
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationLink>9</PaginationLink>
                </PaginationItem>

                <PaginationItem className="hidden md:inline-flex">
                    <PaginationLink>10</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext />
                </PaginationItem> */}
            </PaginationContent>
        </PaginationComponent>
    );
}
