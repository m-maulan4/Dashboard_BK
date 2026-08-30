import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type WidgetProps = {
    title: string;
    Icon: LucideIcon;
    value: string | number;
    color: 'red' | 'green' | 'yellow' | 'blue';
};
const variantClass: Record<string, string> = {
    green: 'bg-green-500/10 border-green-500',
    blue: 'bg-blue-500/10 border-blue-500',
    yellow: 'bg-yellow-500/10 border-yellow-500',
    red: 'bg-red-500/10 border-red-500',
};
export default function Widget({ title, Icon, value, color }: WidgetProps) {
    return (
        <Card
            className={cn(
                'relative gap-1.5 overflow-hidden border-l-4 ring-0',
                variantClass[color],
            )}
            size="sm"
        >
            {Icon && (
                <Icon size={72} className="absolute top-0 right-0 text-muted" />
            )}
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-3xl font-bold">{value}</h2>
            </CardContent>
        </Card>
    );
}
