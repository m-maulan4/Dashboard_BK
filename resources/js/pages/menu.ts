import { LayoutGrid, User } from 'lucide-react';
import { dashboard } from '@/routes';
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
        ],
    },
];
