<?php

namespace App\Services\Siswa;

use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UpdateSiswaService
{
    /**
     * Create a new class instance.
     */
    public function execute(array $data, string $kodeSiswa)
    {
        try {
            DB::transaction(function () use ($data, $kodeSiswa) {
                $kelasId = Kelas::where('kode_kelas', $data['kelas'])->value('id');

                if (!$kelasId) {
                    throw new \Exception('Kelas tidak ditemukan');
                }
                $siswaId = Siswa::where('kode_siswa', $kodeSiswa)->value('id');

                Siswa::where('id', $siswaId)
                    ->update([
                        'nama'          => Str::title(trim($data['nama'])),
                        'nama_panggilan' => Str::title(trim($data['nama_panggilan'])),
                        'jk'            => (int) $data['jk'],
                        'agama'         => $data['agama'],
                        'alamat'        => Str::title(trim($data['alamat'])),
                        'no_orangtua'   => trim($data['no_orangtua']),
                        'status'        => $data['status'],
                    ]);

                $update = KelasSiswa::where(['siswa_id' => $siswaId, 'aktif' => true]);
                $update->update([
                    'kelas_id' => $kelasId,
                ]);
                if ($data['status'] != 'aktif') {
                    $update->update([
                        'aktif' => false
                    ]);
                };

                Inertia::flash('toast', ['type' => 'success', 'message' => 'Berhasil diubah.']);
            });
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Terjadi kesalahan saat menambahkan siswa baru.']);
        }
    }
}
