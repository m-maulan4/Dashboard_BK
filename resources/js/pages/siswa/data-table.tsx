import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Edit } from 'lucide-react';

export default function DataTableSiswa() {
    return (
        <Table className="border-b">
            <TableHeader className="bg-muted">
                <TableRow>
                    <TableHead className="w-3">No</TableHead>
                    <TableHead>Kode Siswa</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>A98ED2</TableCell>
                    <TableCell>Lorem, ipsum dolor.</TableCell>
                    <TableCell>
                        <Badge className="bg-green-800/40 p-2">Laki-laki</Badge>
                    </TableCell>
                    <TableCell>11 IPA-1</TableCell>
                    <TableCell>
                        <Button size={'icon-sm'}>
                            <Edit />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
