import { router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    GraduationCap,
    RotateCw,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import kelulusan from '@/routes/kelulusan';
import kenaikan from '@/routes/kenaikan';
import type { DataSiswaKenaikan, kenaikanAPI } from '@/types';
import DialogKenaikan from './dialog-kenaikan';

export default function DataTableKenaikan() {
    const dataAPI = usePage<{ data: kenaikanAPI }>().props.data;
    console.log(dataAPI);

    const [filter, setFilter] = useState<{
        nama: string | undefined;
        kelas: string | undefined;
    }>({
        nama: '',
        kelas: '',
    });
    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(
                kenaikan.index().url,
                {
                    nama: filter.nama || undefined,
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
        <Card size="sm">
            <CardHeader className="mb-4 flex items-center justify-between">
                <CardTitle className="font-medium">Daftar Siswa</CardTitle>
                <div className="flex items-center space-x-2">
                    <Input
                        value={filter.nama}
                        onChange={(e) =>
                            setFilter((prev) => ({
                                ...prev,
                                nama: e.target.value,
                            }))
                        }
                        className="w-sm"
                        placeholder="Cari siswa"
                    />
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setFilter({ kelas: '', nama: '' })}
                    >
                        <RotateCw />
                    </Button>
                </div>
            </CardHeader>
            <TableKenaikan />
        </Card>
    );
}
function TableKenaikan() {
    const dataAPI = usePage<{ data: kenaikanAPI }>().props.data;
    const tingkatSiswa = (kelas: string) => Number(kelas.match(/\d+/)?.[0]);

    return (
        <Table className="w-full table-fixed">
            <TableHeader className="bg-muted/50">
                <TableRow>
                    <TableHead className="w-10">No</TableHead>
                    <TableHead className="w-28">Kode Siswa</TableHead>
                    <TableHead className="">Nama</TableHead>
                    <TableHead className="w-1/5">
                        <div className="flex space-x-1.5">
                            <span>Kelas Lama</span>
                            <ArrowRight />
                            <span>Kelas Baru</span>
                        </div>
                    </TableHead>
                    <TableHead className="w-30">Status Siswa</TableHead>
                    <TableHead className="w-40">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {dataAPI.DSiswa.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={6}
                            className="h-20 text-center font-semibold text-muted-foreground"
                        >
                            Data belum ada.
                        </TableCell>
                    </TableRow>
                ) : (
                    dataAPI.DSiswa.map((item, key) => (
                        <TableRow key={item.kode_siswa}>
                            <TableCell>{key + 1}</TableCell>
                            <TableCell>{item.kode_siswa}</TableCell>
                            <TableCell>{item.nama}</TableCell>
                            {item.riwayat_kelas.length === 1 ? (
                                <TableCell>
                                    <Badge
                                        color="blue"
                                        value={
                                            item.riwayat_kelas[0].kelas ?? '-'
                                        }
                                    />
                                </TableCell>
                            ) : (
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        {item.riwayat_kelas
                                            .slice(-2)
                                            .map((item, index) => (
                                                <React.Fragment
                                                    key={item.kode_kelas}
                                                >
                                                    <Badge
                                                        color={
                                                            index === 1
                                                                ? 'blue'
                                                                : 'yellow'
                                                        }
                                                        value={item.kelas}
                                                    />
                                                    {index === 0 && (
                                                        <ArrowRight />
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </div>
                                </TableCell>
                            )}
                            <TableCell>
                                <Badge color="green" value={item.status} />
                            </TableCell>
                            <TableCell>
                                {tingkatSiswa(
                                    item.riwayat_kelas.slice(-1)[0].kelas,
                                ) === 12 ? (
                                    <ConfirmGraduationDialog dataSiswa={item} />
                                ) : (
                                    <DialogKenaikan data={item} />
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
function Badge({
    value,
    color,
}: {
    color: 'blue' | 'yellow' | 'green';
    value: string;
}) {
    const variants: Record<string, string> = {
        blue: 'bg-blue-500/30 text-blue-200',
        green: 'bg-green-500/30 text-green-200',
        yellow: 'bg-yellow-500/30 text-yellow-200',
    };

    return (
        <div
            className={cn(
                'w-fit rounded-sm px-1 py-0.5 capitalize',
                variants[color],
            )}
        >
            {value}
        </div>
    );
}
type ConfirmGraduationDialogProps = {
    dataSiswa: DataSiswaKenaikan;
};

function ConfirmGraduationDialog({ dataSiswa }: ConfirmGraduationDialogProps) {
    const [open, setOpen] = useState<boolean>(false);
    const handleSubmit = () => {
        router.post(
            kelulusan.store().url,
            {
                kode_siswa: dataSiswa.kode_siswa,
            },
            {
                onSuccess: () => {
                    setOpen(false);
                },
                replace: true,
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <GraduationCap />
                    Ubah ke Lulus
                </Button>
            </DialogTrigger>

            <DialogContent className="w-2/5">
                <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2 text-xl">
                        Konfirmasi Kelulusan Siswa
                    </DialogTitle>

                    <DialogDescription>
                        Pastikan data siswa sudah benar sebelum mengubah status
                        menjadi lulus.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="rounded-lg border bg-muted/30 p-4">
                        <div className="space-y-3">
                            <div>
                                <p className="text-xs font-medium text-muted-foreground">
                                    Nama Siswa
                                </p>
                                <p className="mt-1 font-medium">
                                    {dataSiswa.nama}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Kode Siswa
                                    </p>
                                    <p className="mt-1 text-sm">
                                        {dataSiswa.kode_siswa}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium text-muted-foreground">
                                        Kelas
                                    </p>
                                    <p className="mt-1 text-sm">
                                        {dataSiswa.riwayat_kelas.at(-1)?.kelas}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border p-4">
                        <p className="mb-3 text-sm font-medium">
                            Perubahan Status
                        </p>

                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Badge color="blue" value={dataSiswa.status} />

                                <span className="text-muted-foreground">→</span>

                                <Badge color="green" value="Lulus" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                        <p className="text-sm leading-relaxed">
                            Perubahan ini akan memengaruhi status akademik siswa
                            dan mungkin tidak dapat dibatalkan.
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Batal
                        </Button>
                    </DialogClose>

                    <Button
                        type="button"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleSubmit()}
                    >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Ya, Ubah Menjadi Lulus
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
