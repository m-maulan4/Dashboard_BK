export type kelasAPI = {
    DKelas: dataKelasType[];
    DJurusan: dataJurusanType[];
    Widget: {
        TKelas: number;
        TJurusan: number;
        TTingkat: number;
    };
};

export type dataKelasType = {
    id: number;
    kode_kelas: string;
    kode_jurusan: string;
    kelas: string;
    tingkat: number;
    rombel: string;
};
export type dataJurusanType = {
    id: number;
    jurusan: string;
    kode_jurusan: string;
};
