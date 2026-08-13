import Heading from '@/components/heading';
import Widget from '@/components/widget';
import kelas from '@/routes/kelas';
import { Head } from '@inertiajs/react';
import { CalendarClock, Database, FileStack, LayoutList } from 'lucide-react';
import TableKelas from './table-kelas';

export default function KelasPage() {
    Head({ title: 'Manajemen Data Kelas' });
    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <Heading
                title="Manajemen Data Kelas"
                description="Kelola seluruh data kelas beserta informasi jurusan dan tingkat"
            />
            <div className="grid grid-cols-4 gap-4">
                <Widget
                    title="Total Kelas"
                    Icon={LayoutList}
                    color="green"
                    value={10}
                />
                <Widget
                    title="Jurusan"
                    Icon={Database}
                    color="blue"
                    value={10}
                />
                <Widget
                    title="Tingkat"
                    Icon={FileStack}
                    color="yellow"
                    value={10}
                />
                <Widget
                    title="Tahun Ajar"
                    Icon={CalendarClock}
                    color="red"
                    value={10}
                />
            </div>
            <TableKelas />
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
