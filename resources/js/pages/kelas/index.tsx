import { usePage } from '@inertiajs/react';
import { Cylinder, Layers, Menu } from 'lucide-react';
import Widget from '@/components/widget';
import PageLayout from '@/layouts/template-page';
import kelas from '@/routes/kelas';
import type { kelasAPI } from '@/types';
import DataTableJurusan from './data-table-jurusan';
import DataTableKelas from './data-table-kelas';

export default function KelasPage() {
    const dataAPI = usePage<{ data: kelasAPI }>().props.data;
    console.log(dataAPI);

    return (
        <PageLayout
            titleHead="Manajemen Data kelas dan Jurusan"
            titleHeading="Manajemen Data kelas dan Jurusan"
            descripHeading="Manajemen Data kelas dan Jurusan"
        >
            <div className="grid grid-cols-3 gap-4">
                <Widget
                    color="green"
                    title="Total Kelas"
                    value={dataAPI.Widget.TKelas}
                    Icon={Cylinder}
                />
                <Widget
                    color="blue"
                    title="Total Tingkat"
                    value={dataAPI.Widget.TTingkat}
                    Icon={Menu}
                />
                <Widget
                    color="green"
                    title="Total Jurusan"
                    value={dataAPI.Widget.TJurusan}
                    Icon={Layers}
                />
            </div>
            <div className="grid grid-cols-5 gap-4">
                <DataTableKelas />
                <DataTableJurusan />
            </div>
        </PageLayout>
    );
}
KelasPage.layout = {
    breadcrumbs: [
        {
            title: 'Kelas & Jurusan',
            href: kelas.index(),
        },
    ],
};
