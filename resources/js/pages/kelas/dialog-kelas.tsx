import { router, usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import kelas from '@/routes/kelas';
import type { dataKelasType, kelasAPI } from '@/types';
import FormKelas from './form-kelas';

type DialogKelasProps = {
    type: 'create' | 'update' | 'delete';
    dataKelas?: dataKelasType;
};
const Variants: Record<
    string,
    {
        title: string;
        titleBTN?: string;
        Icon: LucideIcon;
        btnVariant?: 'destructive' | undefined;
        description?: boolean;
    }
> = {
    create: {
        title: 'Tambah Data Kelas',
        titleBTN: 'Kelas',
        Icon: Plus,
    },
    update: {
        title: 'Ubah Data Kelas',
        Icon: Edit,
    },
    delete: {
        title: 'Hapus Data Kelas',
        btnVariant: 'destructive',
        Icon: Trash2,
        description: true,
    },
};

export default function DialogKelas({ type, dataKelas }: DialogKelasProps) {
    const dataAPI = usePage<{ data: kelasAPI }>().props.data;
    const [open, setOpen] = useState<boolean>(false);
    const variant = Variants[type];
    const handleDelete = () => {
        router.delete(kelas.destroy(dataKelas?.kode_kelas ?? '-').url, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };
    const renderContent = () => {
        if (type === 'create') {
            return <FormKelas type="create" onSuccess={() => setOpen(false)} />;
        }

        if (type === 'update') {
            return (
                <FormKelas
                    type="update"
                    dataKelas={dataKelas}
                    onSuccess={() => setOpen(false)}
                />
            );
        }

        if (type === 'delete') {
            return (
                <div className="flex w-full justify-end" onClick={handleDelete}>
                    <Button className="w-fit" variant={variant.btnVariant}>
                        Hapus
                    </Button>
                </div>
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant={variant.btnVariant}>
                    {variant.Icon && <variant.Icon />}
                    {variant.titleBTN && ' ' + variant.titleBTN}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{variant.title}</DialogTitle>
                    {variant.description && (
                        <DialogDescription>
                            Apakah anda ingin menghapsu kelas {dataKelas?.kelas}{' '}
                            ?
                        </DialogDescription>
                    )}
                </DialogHeader>
                {dataAPI.DJurusan.length === 0 ? (
                    <div className="flex h-20">
                        <h2 className="text-center text-xl font-bold">
                            Data jurusan belum ada silakan input jurusan
                            terlebih dahulu.
                        </h2>
                    </div>
                ) : (
                    renderContent()
                )}
            </DialogContent>
        </Dialog>
    );
}
