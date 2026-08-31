import { usePage } from '@inertiajs/react';
import { Mars, Users, Venus } from 'lucide-react';
import Widget from '@/components/widget';
import PageLayout from '@/layouts/template-page';
import siswa from '@/routes/siswa';
import type { siswaAPI } from '@/types';
import DataTabelSiswa from './data-tabel-siswa';

export default function SiswaPage() {
    const dataAPI = usePage<{ data: siswaAPI }>().props.data;

    return (
        <PageLayout
            titleHead="Manajemen Data Siswa"
            titleHeading="Manajemen Data Siswa"
            descripHeading="Manajemen Data Siswa"
        >
            <div className="grid grid-cols-3 gap-4">
                <Widget
                    Icon={Users}
                    color="green"
                    title="Total Siswa"
                    value={dataAPI.Widget.TSiswa}
                />
                <Widget
                    Icon={Mars}
                    color="green"
                    title="Total Laki-laki"
                    value={dataAPI.Widget.TLaki}
                />
                <Widget
                    Icon={Venus}
                    color="green"
                    title="Total Peremppuan"
                    value={dataAPI.Widget.TPerempuan}
                />
            </div>
            <DataTabelSiswa data={dataAPI} />
        </PageLayout>
    );
}
SiswaPage.layout = {
    breadcrumbs: [
        {
            title: 'Siswa',
            href: siswa.index(),
        },
    ],
};
