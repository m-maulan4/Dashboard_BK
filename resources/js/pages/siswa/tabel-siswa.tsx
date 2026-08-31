import { usePage } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { siswaAPI } from '@/types';
import { DeleteSiswa, DialogSiswa } from './dialog-siswa';
import InfoSiswa from './info-siswa';
const jk: Record<number, string> = {
    1: 'laki-laki',
    2: 'perempuan',
};

export default function TabelSiswa() {
    const dataAPI = usePage<{ data: siswaAPI }>().props.data;

    return (
        <Table className="table-fixed">
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="w-[10%]">No</TableHead>
                    <TableHead className="w-[25%]">Kode Siswa</TableHead>
                    <TableHead className="w-full">Nama</TableHead>
                    <TableHead className="w-[35%]">Nama Panggilan</TableHead>
                    <TableHead className="w-[25%]">Agama</TableHead>
                    <TableHead className="w-[35%]">Jenis Kelamin</TableHead>
                    <TableHead className="w-[25%]">Kelas</TableHead>
                    <TableHead className="w-[25%]">Status</TableHead>
                    <TableHead className="w-[35%] text-center">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataAPI.DSiswa.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={9} className="h-20 text-center">
                            Data tidak ada.
                        </TableCell>
                    </TableRow>
                ) : (
                    dataAPI.DSiswa.map((item, key) => (
                        <TableRow key={item.kode_siswa} className="capitalize">
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{item.kode_siswa}</TableCell>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell>{item.nama_panggilan}</TableCell>
                            <TableCell>{item.agama}</TableCell>
                            <TableCell>{jk[item.jk] ?? '-'}</TableCell>
                            <TableCell>{item.kelas}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell className="flex items-center justify-end space-x-1.5">
                                <InfoSiswa data={item} />
                                <DialogSiswa
                                    title="Ubah data siswa"
                                    type="update"
                                    dataSiswa={item}
                                />
                                <DeleteSiswa data={item} />
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
