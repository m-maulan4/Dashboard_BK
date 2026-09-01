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
import type { dataJurusanType, kelasAPI } from '@/types';
import DialogJurusan from './dialog-jurusan';

export default function DataTableJurusan() {
    const dataAPI = usePage<{ data: kelasAPI }>().props.data;

    return (
        <Card size="sm" className="col-span-2 h-fit">
            <CardHeader>
                <CardTitle>Daftar Jurusan</CardTitle>
                <CardAction>
                    <DialogJurusan type="create" />
                </CardAction>
            </CardHeader>
            <TableJurusan data={dataAPI.DJurusan} />
        </Card>
    );
}
function TableJurusan({ data }: { data: dataJurusanType[] }) {
    return (
        <Table className="w-full table-fixed border-y">
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="w-1/12">No</TableHead>
                    <TableHead>Kode Jurusan</TableHead>
                    <TableHead>Jurusan</TableHead>
                    <TableHead className="w-1/4">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="h-20 text-center text-muted-foreground"
                        >
                            Data belum ada.
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((item, key) => (
                        <TableRow key={item.kode_jurusan}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{item.kode_jurusan}</TableCell>
                            <TableCell>{item.jurusan}</TableCell>
                            <TableCell className="flex items-center justify-end space-x-2">
                                <DialogJurusan
                                    type="update"
                                    dataJurusan={item}
                                />
                                <DialogJurusan
                                    dataJurusan={item}
                                    type="delete"
                                />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
