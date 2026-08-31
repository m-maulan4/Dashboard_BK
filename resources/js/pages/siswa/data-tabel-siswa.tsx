import { router } from '@inertiajs/react';
import { RotateCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import siswa from '@/routes/siswa';
import type { metaPagination, siswaAPI } from '@/types';
import { DialogSiswa } from './dialog-siswa';
import TabelSiswa from './tabel-siswa';
type filterType = {
    nama: string | undefined;
    kelas: string | undefined;
};

export default function DataTabelSiswa({ data }: { data: siswaAPI }) {
    const [filter, setFilter] = useState<filterType>({
        nama: '',
        kelas: '',
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                siswa.index().url,
                {
                    nama: filter.nama || undefined,
                    kelas: filter.kelas || undefined,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [filter.nama, filter.kelas]);

    return (
        <Card size="sm" className="gap-0">
            <CardHeader className="mb-4 flex items-center justify-between">
                <CardTitle className="font-medium">Daftar Siswa</CardTitle>
                <div className="flex items-center space-x-2">
                    <Select
                        value={filter.kelas}
                        onValueChange={(e) =>
                            setFilter((prev) => ({ ...prev, kelas: e }))
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {data.DKelas.map((item) => (
                                    <SelectItem
                                        value={item.kode_kelas}
                                        key={item.kode_kelas}
                                    >
                                        {item.kelas}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input
                        value={filter.nama}
                        onChange={(e) =>
                            setFilter((prev) => ({
                                ...prev,
                                nama: e.target.value,
                            }))
                        }
                        placeholder="Cari siswa"
                    />
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setFilter({ kelas: '', nama: '' })}
                    >
                        <RotateCw />
                    </Button>
                    <Separator orientation="vertical" />
                    <DialogSiswa title="Tambah Data Siswa" type="create" />
                </div>
            </CardHeader>
            <TabelSiswa />
            <CardFooter>
                <PaginationSiswa links={data.meta} />
            </CardFooter>
        </Card>
    );
}
function PaginationSiswa({ links }: { links: metaPagination }) {
    const handlePageChange = (page: number | undefined) => {
        router.get(
            siswa.index().url,
            { page },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };
    const previous = links.links.find((link) =>
        link.label.includes('Previous'),
    );
    const next = links.links.find((link) => link.label.includes('Next'));

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => {
                            if (previous?.page !== null) {
                                handlePageChange(previous?.page);
                            }
                        }}
                        className={
                            !previous ? 'pointer-events-none opacity-50' : ''
                        }
                    />
                </PaginationItem>
                {links.links.slice(1, -1).map((item, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            isActive={item.active}
                            onClick={(e) => {
                                e.preventDefault();

                                if (item.page !== null) {
                                    handlePageChange(item.page);
                                }
                            }}
                        >
                            {item.label}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => {
                            if (next?.page !== null) {
                                handlePageChange(next?.page);
                            }
                        }}
                        className={
                            !next?.page ? 'pointer-events-none opacity-50' : ''
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
// {links.links.map((link, index) => {
//     // Previous
//     if (link.label.includes('Previous')) {
//         return (
//             <PaginationItem key={index}>
//                 <PaginationPrevious
//                     onClick={(e) => {
//                         e.preventDefault();

//                         if (link.page !== null) {
//                             handlePageChange(link.page);
//                         }
//                     }}
//                     className={
//                         !link.page
//                             ? 'pointer-events-none opacity-50'
//                             : ''
//                     }
//                 />
//             </PaginationItem>
//         );
//     }

//     // Next
//     if (link.label.includes('Next')) {
//         return (
//             <PaginationItem key={index}>
//                 <PaginationNext
//                     onClick={(e) => {
//                         e.preventDefault();

//                         if (link.page !== null) {
//                             handlePageChange(link.page);
//                         }
//                     }}
//                     className={
//                         !link.page
//                             ? 'pointer-events-none opacity-50'
//                             : ''
//                     }
//                 />
//             </PaginationItem>
//         );
//     }

//     // Number
//     return (
//         <PaginationItem key={index}>
//             <PaginationLink
//                 isActive={link.active}
//                 onClick={(e) => {
//                     e.preventDefault();

//                     if (link.page !== null) {
//                         handlePageChange(link.page);
//                     }
//                 }}
//             >
//                 {link.label}
//             </PaginationLink>
//         </PaginationItem>
//     );
// })}
