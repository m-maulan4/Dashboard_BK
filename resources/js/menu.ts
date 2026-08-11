import type { NavItem } from '@/types';
import { dashboard } from './routes';
import { LayoutGrid } from 'lucide-react';
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
];
