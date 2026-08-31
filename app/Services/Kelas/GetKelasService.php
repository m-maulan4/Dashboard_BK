<?php

namespace App\Services\Kelas;

use App\Models\Kelas;

class GetKelasService
{
    /**
     * Create a new class instance.
     */
    public function execute()
    {
        return Kelas::query()
            ->join('jurusan', 'kelas.jurusan_id', '=', 'jurusan.id')
            ->select([
                'kelas.id',
                'kelas.kode_kelas',
                'jurusan.jurusan',
            ])
            ->selectRaw("CONCAT(kelas.tingkat, ' ', jurusan.kode_jurusan, ' ', kelas.rombel) AS kelas")
            ->orderBy('tingkat', 'asc')
            ->get();
    }
}
