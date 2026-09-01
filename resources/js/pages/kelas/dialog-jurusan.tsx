import { router } from '@inertiajs/react';
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
import jurusan from '@/routes/jurusan';
import type { dataJurusanType } from '@/types';
import FormJurusan from './form-jurusan';

type DialogJurusanProps = {
    type: 'create' | 'update' | 'delete';
    dataJurusan?: dataJurusanType;
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
        title: 'Tambah Data Jurusan',
        titleBTN: 'Jurusan',
        Icon: Plus,
    },
    update: {
        title: 'Ubah Data Jurusan',
        Icon: Edit,
    },
    delete: {
        title: 'Hapus Data Jurusan',
        btnVariant: 'destructive',
        Icon: Trash2,
        description: true,
    },
};

export default function DialogJurusan({
    type,
    dataJurusan,
}: DialogJurusanProps) {
    const [open, setOpen] = useState<boolean>(false);
    const variant = Variants[type];
    const handleDelete = () => {
        router.delete(jurusan.destroy(dataJurusan?.kode_jurusan ?? '-').url, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };
    const renderContent = () => {
        if (type === 'create') {
            return (
                <FormJurusan type="create" onSuccess={() => setOpen(false)} />
            );
        }

        if (type === 'update') {
            return (
                <FormJurusan
                    type="update"
                    dataJurusan={dataJurusan}
                    onSuccess={() => setOpen(false)}
                />
            );
        }

        if (type === 'delete') {
            return (
                <div className="flex w-full justify-end">
                    <Button onClick={() => handleDelete()} className="w-fit">
                        {<variant.Icon />} Hapus
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
                            Apakah anda yakin ingin menghapus jurusan{' '}
                            {dataJurusan?.jurusan} ?
                        </DialogDescription>
                    )}
                </DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}
