<?php

namespace App\Services\Siswa;

use App\Models\KelasSiswa;
use App\Models\Siswa;
use Illuminate\Http\Request;

class GetSiswaService
{
    /**
     * Create a new class instance.
     */
    public function execute(Request $request)
    {
        $dataAll = KelasSiswa::query()
            ->join('siswa', 'kelas_siswa.siswa_id', '=', 'siswa.id')
            ->join('kelas', 'kelas_siswa.kelas_id', '=', 'kelas.id')
            ->join('jurusan', 'kelas.jurusan_id', '=', 'jurusan.id')
            ->select([
                'siswa.*',
                'kelas.kode_kelas',
            ])
            ->selectRaw("CONCAT(kelas.tingkat, ' ', jurusan.kode_jurusan, ' ', kelas.rombel) AS kelas")
            ->where('aktif', true)
            ->when($request->filled('nama'), function ($query) use ($request) {
                $nama = $request->nama;

                $query->where(function ($q) use ($nama) {
                    $q->where('nama', 'like', "%{$nama}%")
                        ->orWhere('nama_panggilan', 'like', "%{$nama}%");
                });
            })
            ->when($request->filled('kelas'), function ($query) use ($request) {
                $kodeKelas = $request->kelas;
                $query->where('kelas.kode_kelas', $kodeKelas);
            })
            ->paginate(35)->withQueryString();
        $widget = Siswa::query()
            ->where('status', 'aktif')
            ->selectRaw('COUNT(*) as total')
            ->selectRaw('COALESCE(SUM(jk = 1),0) as laki')
            ->selectRaw('COALESCE(SUM(jk = 2),0) as perempuan')
            ->first();
        return [
            'dataAll' => $dataAll->items(),
            'TSiswa' => $widget->total,
            'TLaki' => (int) $widget->laki,
            'TPerempuan' => (int) $widget->perempuan,
            'meta' => [
                'current_page' => $dataAll->currentPage(),
                'total' => $dataAll->total(),
                'last_page' => $dataAll->lastPage(),
                'per_page' => $dataAll->perPage(),
                'from' => $dataAll->firstItem(),
                'to' => $dataAll->lastItem(),
                'links' => $dataAll->linkCollection()
            ]
        ];
    }
}
