<?php

namespace App\Services\Siswa;

use App\Http\Requests\StoreSiswaRequest;
use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StoreSiswaService
{
    /**
     * Create a new class instance.
     */
    public function execute(array $data)
    {
        try {
            DB::transaction(function () use ($data) {
                $kelasId = Kelas::where('kode_kelas', $data['kelas'])->value('id');

                if (!$kelasId) {
                    throw new \Exception('Kelas tidak ditemukan');
                }

                $tahunAjaranId = TahunAjaran::latest('id')->value('id');

                if (!$tahunAjaranId) {
                    throw new \Exception('Tahun ajaran tidak ditemukan');
                }

                do {
                    $kodeSiswa = strtoupper(Str::random(6));
                } while (Siswa::where('kode_siswa', $kodeSiswa)->exists());

                $siswa = Siswa::create([
                    'kode_siswa'    => $kodeSiswa,
                    'nama'          => Str::title(trim($data['nama'])),
                    'nama_panggilan' => Str::title(trim($data['nama_panggilan'])),
                    'jk'            => (int) $data['jk'],
                    'agama'         => $data['agama'],
                    'alamat'        => Str::title(trim($data['alamat'])),
                    'no_orangtua'   => trim($data['no_orangtua']),
                    'status'        => 'aktif',
                ]);

                KelasSiswa::create([
                    'siswa_id'       => $siswa->id,
                    'kelas_id'       => $kelasId,
                    'tahun_ajaran_id' => $tahunAjaranId,
                    'aktif'          => true,
                ]);
                Inertia::flash('toast', ['type' => 'success', 'message' => 'Siswa ' . $data['nama_panggilan'] . ' berhasil ditmbahkan.']);
            });
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Terjadi kesalahan saat nembahkan siswa baru.']);
        }
    }
}
