<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use App\Services\Kelas\GetKelasService;
use App\Services\Siswa\GetSiswaService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KenaikanKelasController extends Controller
{
    public function index(Request $request, GetKelasService $dataKelas)
    {
        $dataAll = KelasSiswa::query()
            ->join('siswa', 'kelas_siswa.siswa_id', '=', 'siswa.id')
            ->join('kelas', 'kelas_siswa.kelas_id', '=', 'kelas.id')
            ->join('jurusan', 'kelas.jurusan_id', '=', 'jurusan.id')
            ->select([
                'siswa.id',
                'siswa.nama',
                'siswa.kode_siswa',
                'siswa.status',
                'kelas.kode_kelas',
            ])
            ->selectRaw("CONCAT_WS(' ', kelas.tingkat, jurusan.kode_jurusan, kelas.rombel) AS kelas")
            ->when($request->filled('nama'), function ($query) use ($request) {
                $nama = $request->nama;
                $query->where(function ($q) use ($nama) {
                    $q->where('nama', 'like', "%{$nama}%")
                        ->orWhere('nama_panggilan', 'like', "%{$nama}%");
                });
            })
            ->where(['siswa.status' => 'aktif'])
            ->get()
            ->groupBy('id')
            ->map(function ($items) {
                $siswa = $items->first();
                return [
                    'nama' => $siswa->nama,
                    'status' => $siswa->status,
                    'kode_siswa' => $siswa->kode_siswa,
                    'riwayat_kelas' => $items->map(function ($item) {
                        return [
                            'kelas' => $item->kelas,
                            'kode_kelas' => $item->kode_kelas,
                        ];
                    })->values()->toArray(),
                ];
            })
            ->values()
            ->toArray();
        return Inertia::render('kenaikanKelas/index', [
            'data' => [
                'DSiswa' => $dataAll,
                'DKelas' => $dataKelas->execute()->get()
            ]
        ]);
    }
    public function update(Request $request)
    {
        $validated = $request->validate([
            'kode_siswa' => ['required', 'exists:siswa,kode_siswa'],
            'kode_kelas_baru' => ['required', 'exists:kelas,kode_kelas']
        ]);
        try {
            $siswa = Siswa::where('kode_siswa', $validated['kode_siswa'])->first();
            $kelas = Kelas::where('kode_kelas', $validated['kode_kelas_baru'])->first();

            if (!$siswa || !$kelas) {
                throw new \Exception('Data siswa atau kelas tidak ditemukan.');
            }

            DB::transaction(function () use ($siswa, $kelas) {
                KelasSiswa::where(['siswa_id' => $siswa->id, 'aktif' => true])
                    ->update(['aktif' => false]);

                KelasSiswa::create([
                    'siswa_id' => $siswa->id,
                    'kelas_id' => $kelas->id,
                    'aktif' => true,
                ]);
            });

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => 'Berhasil diubah.',
            ]);
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => 'Terjadi kesalahan saat update data kelas.',
            ]);
        }
        return back();
    }
}
