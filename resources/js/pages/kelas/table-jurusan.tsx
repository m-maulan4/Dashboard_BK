import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { usePage } from '@inertiajs/react';
import { Edit, Plus } from 'lucide-react';
import { kelasAPI } from './type';
import FormJurusan from './form-jurusan';

export default function TableJurusan() {
    return (
        <Card className="h-fit p-0 py-4">
            <div className="flex items-center justify-between px-4">
                <CardTitle>Daftar Jurusan</CardTitle>
                <FormJurusan />
            </div>
            <DataTableJurusan />
        </Card>
    );
}
function DataTableJurusan() {
    const data = usePage<{ data: kelasAPI }>().props.data;
    return (
        <Table className="border-b">
            <TableHeader className="bg-muted">
                <TableRow>
                    <TableHead className="w-3">No</TableHead>
                    <TableHead>Jurusan</TableHead>
                    <TableHead>Singkatan</TableHead>
                    <TableHead className="text-end">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.DJurusan.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No results.
                        </TableCell>
                    </TableRow>
                ) : (
                    data.DJurusan.map((item, key) => (
                        <TableRow key={item.singkatan + key}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell>{item.singkatan}</TableCell>
                            <TableCell className="flex items-center justify-end">
                                <Button size="icon-sm">
                                    <Edit />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
