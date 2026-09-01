import type { dataKelasType, metaPagination } from '.';

export type siswaAPI = {
    DSiswa: dataSiswaType[];
    DKelas: dataKelasType[];
    Widget: widget;
    meta: metaPagination;
};

export type dataSiswaType = {
    id: number;
    kode_siswa: string;
    nama: string;
    nama_panggilan: string;
    jk: number;
    agama: string;
    alamat: string;
    no_orangtua: string;
    status: string;
    kode_kelas: string;
    kelas: string;
};

export type widget = {
    TSiswa: number;
    TLaki: number;
    TPerempuan: number;
};
