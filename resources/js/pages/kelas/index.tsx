import Heading from '@/components/heading';
import Widget from '@/components/widget';
import kelas from '@/routes/kelas';
import { Head, usePage } from '@inertiajs/react';
import { Database, FileStack, LayoutList } from 'lucide-react';
import TableKelas from './table-kelas';
import TableJurusan from './table-jurusan';
import { kelasAPI } from './type';

export default function KelasPage() {
    const data = usePage<{ data: kelasAPI }>().props.data;
    Head({ title: 'Manajemen Data Kelas' });
    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <Heading
                title="Manajemen Data Kelas"
                description="Kelola seluruh data kelas beserta informasi jurusan dan tingkat"
            />
            <div className="grid grid-cols-3 gap-4">
                <Widget
                    title="Total Kelas"
                    Icon={Database}
                    color="green"
                    value={data.widget.TKelas}
                />
                <Widget
                    title="Total Jurusan"
                    Icon={LayoutList}
                    color="blue"
                    value={data.widget.TJurusan}
                />
                <Widget
                    title="Total Tingkatan"
                    Icon={FileStack}
                    color="yellow"
                    value={data.widget.TTingkat}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <TableKelas />
                <TableJurusan />
            </div>
        </div>
    );
}
KelasPage.layout = {
    breadcrumbs: [
        {
            title: 'Manajemen Data Kelas',
            href: kelas.index(),
        },
    ],
};
