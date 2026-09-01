import { router, usePage } from '@inertiajs/react';
import { ArrowRight, RotateCw } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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
import kenaikan from '@/routes/kenaikan';
import type { kenaikanAPI } from '@/types';
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
                                    <Bedge
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
                                                    <Bedge
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
                                <Bedge color="green" value={item.status} />
                            </TableCell>
                            <TableCell>
                                {tingkatSiswa(
                                    item.riwayat_kelas.slice(-1)[0].kelas,
                                ) !== 12 && <DialogKenaikan data={item} />}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
function Bedge({
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
