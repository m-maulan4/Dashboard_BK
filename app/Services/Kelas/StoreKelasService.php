<?php

namespace App\Services\Kelas;

use App\Models\Jurusan;
use App\Models\Kelas;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class StoreKelasService
{
    /**
     * Create a new class instance.
     */
    public function execute(array $data)
    {
        try {
            DB::transaction(function () use ($data) {
                $jurusanId = Jurusan::where('kode_jurusan', $data['kode_jurusan'])->value('id');
                if (!$jurusanId) {
                    throw new \Exception('Data jurusan tidak ditemukan.');
                }
                do {
                    $kodeKelas = strtoupper(Str::random(6));
                } while (Kelas::where('kode_kelas', $kodeKelas)->exists());
                Kelas::firstOrCreate([
                    'jurusan_id' => $jurusanId,
                    'tingkat' => $data['tingkat'],
                    'rombel' => $data['rombel'],
                ], ['kode_kelas' => $kodeKelas,]);
                Inertia::flash('toast', ['type' => 'success', 'message' => 'Berhasil ditambahkan.']);
            });
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
