import PageLayout from '@/layouts/template-page';
import kenaikan from '@/routes/kenaikan';
import DataTableKenaikan from './data-table';

export default function KenaikanPage() {
    return (
        <PageLayout
            titleHead="Manajemen Data Kenaikan Kelas dan kelulusan"
            titleHeading="Manajemen Data Kenaikan Kelas dan kelulusan"
            descripHeading="Manajemen Data Kenaikan Kelas dan kelulusan"
        >
            <DataTableKenaikan />
        </PageLayout>
    );
}
KenaikanPage.layout = {
    breadcrumbs: [
        {
            title: 'Kenaikan kelas dan kelulusan',
            href: kenaikan.index(),
        },
    ],
};
