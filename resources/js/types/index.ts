export type * from './auth';
export type * from './navigation';
export type * from './ui';
export type * from './siswa';

export type metaPagination = {
    current_page: number;
    total: number;
    last_page: number;
    per_page: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }[];
};
