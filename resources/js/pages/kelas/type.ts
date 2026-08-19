export type kelasAPI = {
    DKelas: dataKelas[];
    DJurusan: dataJurusan[];
    widget: widget;
};
export type dataKelas = {
    kode_kelas: string;
    tingkatan: number;
    rombel: number;
    nama: string;
    singkatan: string;
};
export type dataJurusan = {
    id: number;
    nama: string;
    singkatan: string;
};
export type widget = {
    TKelas: number;
    TJurusan: number;
    TTingkat: number;
};
