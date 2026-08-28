import { Head } from '@inertiajs/react';
import React from 'react';
import Heading from '@/components/heading';

type PageLayoutProps = {
    titleHead: string;
    titleHeading: string;
    descripHeading: string;
    children: React.ReactNode;
};
export default function PageLayout({
    titleHead,
    children,
    descripHeading,
    titleHeading,
}: PageLayoutProps) {
    Head({ title: titleHead });

    return (
        <>
            <Head title={titleHead} />
            <div className="flex w-full flex-col gap-4 p-4">
                <Heading title={titleHeading} description={descripHeading} />
                {children}
            </div>
        </>
    );
}
