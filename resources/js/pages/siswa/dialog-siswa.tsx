import { router } from '@inertiajs/react';
import { Edit, Plus, Trash2, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
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
import siswa from '@/routes/siswa';
import type { dataSiswaType } from '@/types';
import FormSiswa from './form-siswa';

type DialogSiswaProps = {
    type: 'create' | 'update' | 'delete';
    title: string;
    description?: string;
    dataSiswa?: dataSiswaType;
};
type variantsTypes = {
    BTNVarian:
        'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    BTNIcon: LucideIcon;
    BTNTitle?: string;
    children: (
        dataSiswa: dataSiswaType | undefined,
        onClose: () => void,
    ) => ReactNode;
};
const variants: Record<string, variantsTypes> = {
    create: {
        BTNVarian: 'default',
        BTNIcon: Plus,
        BTNTitle: 'Siswa',
        children: (dataSiswa, onClose) => (
            <FormSiswa closeDialog={onClose} type="create" />
        ),
    },
    update: {
        BTNVarian: 'default',
        BTNIcon: Edit,
        children: (dataSiswa, onClose) => (
            <FormSiswa
                dataSiswa={dataSiswa}
                closeDialog={onClose}
                type="update"
            />
        ),
    },
};
export function DialogSiswa({
    type,
    title,
    description,
    dataSiswa,
}: DialogSiswaProps) {
    const [open, setOpen] = useState<boolean>(false);
    const variant = variants[type];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant={variant.BTNVarian ?? ''}>
                    {variant.BTNIcon && <variant.BTNIcon />} {variant.BTNTitle}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-dvh space-y-4 overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {variant.children(dataSiswa, () => setOpen(false))}
            </DialogContent>
        </Dialog>
    );
}
export function DeleteSiswa({ data }: { data: dataSiswaType }) {
    const [open, setOpen] = useState<boolean>(false);
    const handleDelete = () => {
        router.delete(siswa.destroy(data.kode_siswa).url, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Data Siswa?</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus data siswa ini? Data
                        yang telah dihapus tidak dapat dikembalikan.
                    </DialogDescription>
                </DialogHeader>
                <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center gap-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background">
                            <User className="h-8 w-8 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                            <p className="truncate font-medium">{data.nama}</p>
                            <p className="text-sm text-muted-foreground">
                                Kode Siswa: {data.kode_siswa}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Kelas: {data.kelas}
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="destructive"
                        onClick={() => handleDelete()}
                    >
                        Hapus
                    </Button>
                    <DialogClose asChild>
                        <Button>Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
