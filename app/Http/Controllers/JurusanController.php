<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJurusanRequest;
use App\Models\Jurusan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JurusanController extends Controller
{
    public function store(StoreJurusanRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated) {

                $jurusan = Jurusan::firstOrCreate(
                    [
                        'nama' => Str::title(trim($validated['nama'])),
                        'singkatan' => strtoupper(trim($validated['singkatan'])),
                    ],
                    [
                        'nama' => Str::title(trim($validated['nama'])),
                        'singkatan' => strtoupper(trim($validated['singkatan'])),
                    ],
                );
                if (!$jurusan->wasRecentlyCreated) {
                    throw new \RuntimeException(
                        'jurusaan dengan singakatan tersebut sudah ada.'
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
