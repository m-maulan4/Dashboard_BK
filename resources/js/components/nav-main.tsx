import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';
import React from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <SidebarGroup className="px-2 py-0">
            {items.map((item) => (
                <React.Fragment key={item.label}>
                    <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
                    <SidebarMenu className="gap-1">
                        {item.menu.map((itm) => (
                            <SidebarMenuItem key={itm.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(itm.href)}
                                    tooltip={{ children: itm.title }}
                                >
                                    <Link href={itm.href} prefetch>
                                        {itm.icon && <itm.icon />}
                                        <span>{itm.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </React.Fragment>
            ))}
        </SidebarGroup>
    );
}
