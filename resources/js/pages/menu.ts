import {
    ChartNoAxesCombined,
    LayoutGrid,
    LayoutList,
    User,
} from 'lucide-react';
import { dashboard } from '@/routes';
import kelas from '@/routes/kelas';
import kenaikan from '@/routes/kenaikan';
import siswa from '@/routes/siswa';
import type { NavItem } from '@/types';

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
                icon: User,
            },
            {
                title: 'Kelas & Jurusan',
                href: kelas.index(),
                icon: LayoutList,
            },
            {
                title: 'Kenaikan Kelas',
                href: kenaikan.index(),
                icon: ChartNoAxesCombined,
            },
        ],
    },
];
