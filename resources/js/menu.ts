import type { NavItem } from '@/types';
import { dashboard } from './routes';
import { Calendar, ClipboardList, LayoutGrid, Users } from 'lucide-react';
import siswa from './routes/siswa';
import kelas from './routes/kelas';
import semester from './routes/semester';
export const mainNavItems: NavItem[] = [
    {
        label: 'Main Menu',
        menu: [
            {
                title: 'Dashboard',
                href: dashboard(),
                icon: LayoutGrid,
            },
        ],
    },
    {
        label: 'Akademik',
        menu: [
            {
                title: 'Siswa',
                href: siswa.index(),
                icon: Users,
            },
            {
                title: 'Kelas',
                href: kelas.index(),
                icon: ClipboardList,
            },
            {
                title: 'Semester',
                href: semester.index(),
                icon: Calendar,
            },
        ],
    },
];
