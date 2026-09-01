<?php

namespace App\Services\Kelas;

use App\Models\Jurusan;
use App\Models\Kelas;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UpdateKelasService
{
    /**
     * Create a new class instance.
     */
    public function execute(array $data, string $kodeKelas)
    {
        try {
            DB::transaction(function () use ($data, $kodeKelas) {
                $jurusanId = Jurusan::where('kode_jurusan', $data['kode_jurusan'])
                    ->value('id');

                if (!$jurusanId) {
                    throw new \Exception('Jurusan tidak ditemukan.');
                }

                $updated = Kelas::where('kode_kelas', $kodeKelas)
                    ->update([
                        'jurusan_id' => $jurusanId,
                        'rombel'     => $data['rombel'],
                        'tingkat'    => $data['tingkat'],
                    ]);

                if ($updated === 0) {
                    throw new \Exception('Kelas tidak ditemukan atau tidak ada perubahan.');
                }
            });
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Berhasil diubah.']);
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
