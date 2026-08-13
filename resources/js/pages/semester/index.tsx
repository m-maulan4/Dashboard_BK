import Heading from '@/components/heading';
import Widget from '@/components/widget';
import { Head } from '@inertiajs/react';
import {
    Ban,
    CalendarCheck,
    Database,
    ShieldBan,
    ShieldCheck,
} from 'lucide-react';
import semester from '@/routes/semester';
import TableSemester from './table-kelas';

export default function SemesterPage() {
    Head({ title: 'Manajemen Data Semester' });
    return (
        <div className="flex w-full flex-col gap-4 p-4">
            <Heading
                title="Manajemen Data Semester"
                description="Kelola periode semester dan tahun ajaran sekolah"
            />
            <div className="grid grid-cols-4 gap-4">
                <Widget
                    title="Total Semester"
                    Icon={Database}
                    color="green"
                    value={10}
                />
                <Widget
                    title="Aktif"
                    Icon={ShieldCheck}
                    color="blue"
                    value={10}
                />
                <Widget
                    title="Nonaktif"
                    Icon={ShieldBan}
                    color="yellow"
                    value={10}
                />
                <Widget
                    title="Semester Berjalan"
                    Icon={CalendarCheck}
                    color="red"
                    value={10}
                />
            </div>
            <TableSemester />
        </div>
    );
}
SemesterPage.layout = {
    breadcrumbs: [
        {
            title: 'Manajemen Data Semester',
            href: semester.index(),
        },
    ],
};
