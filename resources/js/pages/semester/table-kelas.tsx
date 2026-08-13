import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import DataTableSemester from './data-table';

export default function TableSemester() {
    return (
        <Card className="p-0 py-4">
            <div className="flex items-center justify-between px-4">
                <CardTitle>Daftar Semester</CardTitle>
                <div className="flex items-center gap-2">
                    <Button>
                        <Plus /> Tambah Semester
                    </Button>
                </div>
            </div>
            <DataTableSemester />
            <div className="flex items-center justify-between px-4">
                <p>Menampilkan 1–8 dari 16 data</p>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon-sm">
                        <ArrowLeft />
                    </Button>
                    <Button variant="outline" size="icon-sm">
                        1
                    </Button>
                    <Button variant="outline" size="icon-sm" disabled>
                        2
                    </Button>
                    <Button variant="outline" size="icon-sm">
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </Card>
    );
}
