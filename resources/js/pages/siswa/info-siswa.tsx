import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useInitials } from '@/hooks/use-initials';
import type { dataSiswaType } from '@/types';

export default function InfoSiswa({ data }: { data: dataSiswaType }) {
    const getInitials = useInitials();
    const jk = data.jk === 1 ? 'Laki-laki' : data.jk === 2 ? 'Perepuan' : '';
    console.log(data);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Eye />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detail Siswa</DialogTitle>
                </DialogHeader>
                <div className="flex w-full flex-col items-center justify-center space-y-2">
                    <div className="flex aspect-square w-20 items-center justify-center rounded-full bg-muted/50 text-2xl font-bold">
                        {getInitials(data.nama)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Kode Siswa: {data.kode_siswa}
                    </p>
                    <div className="flex w-4/5 flex-col gap-2 overflow-hidden rounded-lg bg-muted/50">
                        <ItemList keyValue="kelas" value={data.kelas} />
                        <ItemList keyValue="Agama" value={data.agama} />
                        <ItemList keyValue="Jenis Kelamin" value={jk} />
                        <ItemList
                            keyValue="No Orangtua"
                            value={data.no_orangtua}
                        />
                        <ItemList keyValue="Alamat" value={data.alamat} />
                        <ItemList keyValue="Status" value={data.status} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
function ItemList({ keyValue, value }: { keyValue: string; value: string }) {
    return (
        <div className="flex w-full items-center justify-between border-b-2 px-3 py-2 capitalize hover:bg-muted">
            <div className="min-w-2/5 text-muted-foreground">{keyValue}</div>
            <div className="w-full text-justify text-right text-wrap">
                {value}
            </div>
        </div>
    );
}
