import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, ListRestart, Plus } from 'lucide-react';
import DataTableKelas from './data-table';
import FormKelas from './form-kelas';
import { router } from '@inertiajs/react';
import kelas from '@/routes/kelas';
import { useEffect, useState } from 'react';

export default function TableKelas() {
    const [tingkatan, setTingkatan] = useState<string>('');
    useEffect(() => {
        router.get(
            kelas.index().url,
            { tingkatan: tingkatan === 'all' ? undefined : tingkatan },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }, [tingkatan]);
    return (
        <Card className="col-span-2 p-0 py-4">
            <div className="flex items-center justify-between px-4">
                <CardTitle>Daftar Siswa</CardTitle>
                <div className="flex items-center gap-2">
                    <Select
                        value={tingkatan}
                        onValueChange={(e) => setTingkatan(e)}
                    >
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Tingkatan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="11">11</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Separator orientation="vertical" />
                    <FormKelas />
                </div>
            </div>
            <DataTableKelas />
            <div className="flex items-center justify-between px-4">
                <p>Menampilkan 1–8 dari 16 data</p>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon-sm">
                        <ArrowLeft />
                    </Button>
                    <Button variant="outline" size="icon-sm">
                        1
                    </Button>
                    <Button variant="outline" size="icon-sm" disabled>
                        2
                    </Button>
                    <Button variant="outline" size="icon-sm">
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
