import { usePage } from '@inertiajs/react';
import { Card, CardAction, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { dataKelasType, kelasAPI } from '@/types';
import DialogKelas from './dialog-kelas';

export default function DataTableKelas() {
    const dataAPI = usePage<{ data: kelasAPI }>().props.data;

    return (
        <Card size="sm" className="col-span-3 h-fit">
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Daftar Kelas</CardTitle>
                <CardAction>
                    <DialogKelas type="create" />
                </CardAction>
            </CardHeader>
            <TableKelas data={dataAPI.DKelas} />
        </Card>
    );
}

function TableKelas({ data }: { data: dataKelasType[] }) {
    return (
        <Table className="w-full table-fixed border-y">
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="w-1/12">No</TableHead>
                    <TableHead>Kode Kelas</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="h-20 w-full text-center text-muted-foreground"
                        >
                            Data belum ada.
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((item, key) => (
                        <TableRow key={item.kode_kelas}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{item.kode_kelas}</TableCell>
                            <TableCell>{item.kelas}</TableCell>
                            <TableCell className="flex items-center justify-end space-x-2">
                                <DialogKelas type="update" dataKelas={item} />
                                <DialogKelas type="delete" dataKelas={item} />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
