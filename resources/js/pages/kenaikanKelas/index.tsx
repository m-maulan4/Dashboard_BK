import PageLayout from '@/layouts/template-page';
import kenaikan from '@/routes/kenaikan';
import DataTableKenaikan from './data-table';

export default function KenaikanPage() {
    return (
        <PageLayout
            titleHead="Manajemen Data Kenaikan Kelas"
            titleHeading="Manajemen Data Kenaikan Kelas"
            descripHeading="Manajemen Data Kenaikan Kelas"
        >
            <DataTableKenaikan />
        </PageLayout>
    );
}
KenaikanPage.layout = {
    breadcrumbs: [
        {
            title: 'Kenaikan kelas',
            href: kenaikan.index(),
        },
    ],
};
