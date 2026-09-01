import { useForm, usePage } from '@inertiajs/react';
import { AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useInitials } from '@/hooks/use-initials';
import kenaikan from '@/routes/kenaikan';
import type { DataSiswaKenaikan, kenaikanAPI } from '@/types';

export default function DialogKenaikan({ data }: { data: DataSiswaKenaikan }) {
    const [open, setOpen] = useState<boolean>(false);
    const getInitials = useInitials();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <TrendingUp /> Kenaikan
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[30%]">
                <DialogHeader>
                    <DialogTitle>Kenaikan kelas siswa</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-4">
                    <div className="mx-auto flex aspect-square w-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold">
                        {getInitials(data.nama)}
                    </div>
                    <FormKenaikan
                        onSuccess={() => setOpen(false)}
                        dataSiswa={data}
                    />
                    <div className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                        <p className="text-sm leading-relaxed">
                            Jika ada perubahan data siswa dapat diubah pada menu
                            siswa
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
function FormKenaikan({
    dataSiswa,
    onSuccess,
}: {
    onSuccess: () => void;
    dataSiswa: DataSiswaKenaikan;
}) {
    const dataAPI = usePage<{ data: kenaikanAPI }>().props.data;
    const { data, setData, errors, post, reset, processing } = useForm({
        kode_siswa: dataSiswa.kode_siswa,
        kode_kelas_baru: '',
    });
    const tingkatSiswa = dataSiswa.riwayat_kelas
        .slice(-1)[0]
        .kelas.match(/\d+/)?.[0];
    const daftarKelas = dataAPI.DKelas.filter(
        (item) => item.tingkat === Number(tingkatSiswa) + 1,
    );
    const handleKenaikan = () => {
        post(kenaikan.update().url, {
            onSuccess: () => {
                reset();
                onSuccess();
            },
            replace: true,
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleKenaikan();
            }}
        >
            <div className="flex flex-wrap items-center justify-center space-x-4">
                <div className="flex w-1/3 flex-col items-end gap-1">
                    <FieldLabel className="w-fit">Kelas Lama</FieldLabel>
                    <p className="text-xl font-bold">
                        {dataSiswa.riwayat_kelas.at(-1)?.kelas}
                    </p>
                </div>
                <ArrowRight className="size-1/12" />
                <div className="flex w-1/3 flex-col gap-1">
                    <FieldLabel>Kelas Baru</FieldLabel>
                    {errors.kode_kelas_baru && (
                        <FieldError>Pilih kelas terlebih dahulu.</FieldError>
                    )}
                    <Select
                        value={data.kode_kelas_baru}
                        onValueChange={(e) => setData('kode_kelas_baru', e)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {daftarKelas.map((item) => (
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
                </div>
                <div className="mt-8 flex w-full justify-end">
                    <Button type="submit" disabled={processing}>
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
}
