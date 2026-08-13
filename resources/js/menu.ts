import type { NavItem } from '@/types';
import { dashboard } from './routes';
import { LayoutGrid, Users } from 'lucide-react';
import siswa from './routes/siswa';
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
        ],
    },
];
