import type { dataKelasType } from './kelas';

export type kenaikanAPI = {
    DSiswa: DataSiswaKenaikan[];
    DKelas: dataKelasType[];
};
export type DataSiswaKenaikan = {
    nama: string;
    kode_siswa: string;
    status: string;
    riwayat_kelas: {
        kelas: string;
        kode_kelas: string;
    }[];
};
