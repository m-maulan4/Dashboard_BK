<?php

namespace App\Http\Controllers;

use App\Models\Jurusan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class JurusanController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'jurusan' => ['required', 'string'],
                'kode_jurusan' => ['required', 'string'],
            ]);
            $checkJurusan = Jurusan::where([
                'jurusan' => $request->jurusan,
                'kode_jurusan' => $request->kode_jurusan
            ])->first();
            if ($checkJurusan) {
                throw new \Exception('Data sudah ada.');
            }
            DB::transaction(function () use ($validated) {
                $jurusan = Str::title($validated['jurusan']);
                $kodeJurusan = strtoupper($validated['kode_jurusan']);
                Jurusan::create([
                    'jurusan' => $jurusan,
                    'kode_jurusan' => $kodeJurusan
                ]);
            });
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Berhasil ditambahkan.']);
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => $e->getMessage()]);
        }
        return back();
    }
    public function update(Request $request, string $idJurusan)
    {
        try {
            $validated = $request->validate([
                'jurusan' => ['required', 'string'],
                'kode_jurusan' => ['required', 'string'],
            ]);
            DB::transaction(function () use ($validated, $idJurusan) {
                $jurusan = Str::title($validated['jurusan']);
                $kodeJurusan = strtoupper($validated['kode_jurusan']);
                Jurusan::where('id', $idJurusan)
                    ->update([
                        'jurusan' => $jurusan,
                        'kode_jurusan' => $kodeJurusan
                    ]);
            });
            Inertia::flash('toast', ['type' => 'success', 'message' => 'Berhasil diubah.']);
        } catch (\Throwable $e) {
            report($e);
            Inertia::flash('toast', ['type' => 'error', 'message' => $e->getMessage()]);
        }
        return back();
    }
    public function destroy(string $kodeJurusan)
    {
        $checkJurusan = Jurusan::where('kode_jurusan', $kodeJurusan)->first();
        if (!$checkJurusan) {
            Inertia::flash('toast', ['type' => 'error', 'message' => 'Jurusan tidak ditemukan.']);
            return back();
        }
        $checkJurusan->delete();
        Inertia::flash('toast', ['type' => 'success', 'message' => 'Berhasil dihapus.']);
        return back();
    }
}
