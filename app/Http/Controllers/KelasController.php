<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Http\Requests\UpdateKelasRequest;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Services\Kelas\GetKelasService;
use App\Services\Kelas\StoreKelasService;
use App\Services\Kelas\UpdateKelasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    public function index(GetKelasService $DKelas)
    {
        $DJurusan = Jurusan::query()->orderBy('id', 'asc')->get();
        $widget = [
            'TKelas' => $DKelas->execute()->count(),
            'TJurusan' => $DJurusan->count(),
            'TTingkat' => $DKelas->execute()->clone()->select('tingkat')->distinct()->count()
        ];
        return Inertia::render('kelas/index', [
            'data' => [
                'DKelas' => $DKelas->execute()->get(),
                'DJurusan' => $DJurusan,
                'Widget' => $widget
            ]
        ]);
    }
    public function store(StoreKelasRequest $request, StoreKelasService $store)
    {
        $validated = $request->validated();
        $store->execute($validated);
        return back();
    }
    public function update(UpdateKelasRequest $request, UpdateKelasService $update, string $kodeKelas)
    {
        $validated = $request->validated();
        $update->execute($validated, $kodeKelas);
        return back();
    }
    public function destroy(string $kodeKelas)
    {
        $checkKelas = Kelas::where('kode_kelas', $kodeKelas)->first();
        if (!$checkKelas) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Kelas tidak ditemukan.']);
            return back();
        }
        $checkKelas->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Kelas berhasil dihapus.']);
        return back();
    }
}
