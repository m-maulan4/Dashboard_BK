import Heading from '@/components/heading';
import Widget from '@/components/widget';
import siswa from '@/routes/siswa';
import { Head } from '@inertiajs/react';
import { CalendarClock, Mars, Users, Venus } from 'lucide-react';
import TableSiswa from './table-siswa';

export default function SiswaPage() {
    Head({ title: 'Manajemen Data Siswa' });
    return (
        <div className="flex flex-col gap-4 p-4">
            <Heading
                title="Manajemen Data Siswa"
                description="Kelola seluruh data siswa beserta informasi yang lain."
            />
            <div className="grid grid-cols-4 gap-4">
                <Widget
                    color="green"
                    title="Total Siswa"
                    value={1000}
                    Icon={Users}
                />
                <Widget
                    color="blue"
                    title="Siswa Laki-laki"
                    value={1000}
                    Icon={Mars}
                />
                <Widget
                    color="blue"
                    title="Siswa Perempuan"
                    value={1000}
                    Icon={Venus}
                />
                <Widget
                    color="blue"
                    title="Tahun Ajar"
                    value={1000}
                    Icon={CalendarClock}
                />
            </div>
            <TableSiswa />
        </div>
    );
}
SiswaPage.layout = {
    breadcrumbs: [
        {
            title: 'Manajemen Data Siswa',
            href: siswa.index(),
        },
    ],
};
