<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKelasRequest;
use App\Models\Jurusan;
use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class KelasController extends Controller
{
    public function index(Request $request)
    {
        $query = Kelas::query()
            ->join('jurusan', 'jurusan.id', '=', 'kelas.id_jurusan')
            ->select([
                'kode_kelas',
                'tingkatan',
                'rombel',
                'jurusan.nama',
                'jurusan.singkatan'
            ]);
        if ($request->filled('tingkatan')) {
            $query->where('kelas.tingkatan', $request->tingkatan);
        }
        $kelas = $query->get();
        $jurusan = Jurusan::query()
            ->select([
                'id',
                'nama',
                'singkatan',
            ])
            ->get();

        return Inertia::render('kelas/index', [
            'data' => [
                'widget' => [
                    'TKelas'    => Kelas::count(),
                    'TJurusan'  => $jurusan->count(),
                    'TTingkat'  => Kelas::pluck('tingkatan')->unique()->count(),
                ],
                'DKelas'   => $kelas,
                'DJurusan' => $jurusan,
            ],
        ]);
    }
    public function store(StoreKelasRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated) {
                do {
                    $kodeKelas = strtoupper(Str::random(6));
                } while (Kelas::where('kode_kelas', $kodeKelas)->exists());

                $kelas = Kelas::firstOrCreate(
                    [
                        'rombel' => $validated['rombel'],
                        'id_jurusan' => (int) $validated['jurusan'],
                        'tingkatan' => (int) $validated['tingkatan'],
                    ],
                    [
                        'kode_kelas' => $kodeKelas,
                        'id_jurusan' => (int) $validated['jurusan'],
                        'rombel' => $validated['rombel'],
                        'tingkatan' => (int) $validated['tingkatan'],
                    ]
                );
                if (!$kelas->wasRecentlyCreated) {
                    throw new \RuntimeException(
                        'Kelas dengan rombel, jurusan, dan tingkatan tersebut sudah ada.'
                    );
                }
            });

            Inertia::flash('toast', [
                'type' => 'success',
                'message' => 'Berhasil Ditambahkan',
            ]);

            return back();
        } catch (\Throwable $e) {
            report($e);

            Inertia::flash('toast', [
                'type' => 'error',
                'message' => $e->getMessage(),
            ]);

            return back();
        }
    }
}
