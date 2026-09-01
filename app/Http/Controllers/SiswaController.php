<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSiswaRequest;
use App\Http\Requests\UpdateSiswaRequest;
use App\Models\Kelas;
use App\Models\KelasSiswa;
use App\Models\Siswa;
use App\Services\Kelas\GetKelasService;
use App\Services\Siswa\GetSiswaService;
use App\Services\Siswa\StoreSiswaService;
use App\Services\Siswa\UpdateSiswaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    public function index(Request $request, GetSiswaService $getSiswaService, GetKelasService $DKelas)
    {
        $DSiswa = $getSiswaService->execute($request);

        return Inertia::render('siswa/index', [
            'data' => [
                'DSiswa' => $DSiswa['dataAll'],
                'DKelas' => $DKelas->execute()->get(),
                'meta' => $DSiswa['meta'],
                'Widget' => [
                    'TSiswa' => $DSiswa['TSiswa'],
                    'TLaki' => $DSiswa['TLaki'],
                    'TPerempuan' => $DSiswa['TPerempuan']
                ]
            ]
        ]);
    }
    public function store(StoreSiswaRequest $request, StoreSiswaService $store)
    {
        $validated = $request->validated();
        $store->execute($validated);
        return back();
    }
    public function update(UpdateSiswaRequest $request, UpdateSiswaService $update, string $kodeSiswa)
    {
        $validated = $request->validated();
        $update->execute($validated, $kodeSiswa);
        return back();
    }
    public function destroy(string $kodeSiswa)
    {
        $siswa = Siswa::where('kode_siswa', $kodeSiswa)->first();
        if (!$siswa) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Data tidak ditemukan.']);
            return back();
        };
        $siswa->update(['status' => 'nonaktif',]);
        KelasSiswa::where([
            'aktif' => true,
            'siswa_id' => $siswa->id,
        ])->update(['aktif' => false,]);
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Data berhasil dihapus.']);
        return back();
    }
}
