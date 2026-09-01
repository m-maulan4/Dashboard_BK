<?php

namespace App\Http\Controllers;

use App\Models\KelasSiswa;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class KelulusanController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kode_siswa' => ['required', 'exists:siswa,kode_siswa']
        ]);

        try {
            $siswa = Siswa::where(['kode_siswa' => $validated['kode_siswa'], 'status' => 'aktif'])->first();
            if (!$siswa) {
                throw new \Exception('Siswa tidak ditemukan.');
            }
            DB::transaction(function () use ($siswa) {
                $siswa->update(['status' => 'lulus']);
                KelasSiswa::where(['siswa_id' => $siswa->id, 'aktif' => true])
                    ->update([
                        'aktif' => false
                    ]);
            });
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Statsu siswa berhasil diubah.']);
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Terjadi kesalahan.']);
        }
        return back();
    }
}
