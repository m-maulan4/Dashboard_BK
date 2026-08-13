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

export default function TableKelas() {
    return (
        <Card className="p-0 py-4">
            <div className="flex items-center justify-between px-4">
                <CardTitle>Daftar Siswa</CardTitle>
                <div className="flex items-center gap-2">
                    <Select>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="light">10-IPA 1</SelectItem>
                                <SelectItem value="light">10-IPA 2</SelectItem>
                                <SelectItem value="light">10-IPA 3</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button variant="destructive">
                        <ListRestart /> Reset
                    </Button>
                    <Separator orientation="vertical" />
                    <Button>
                        <Plus /> Tambah Siswa
                    </Button>
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
