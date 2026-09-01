<?php

use App\Http\Controllers\JurusanController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\SiswaController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    // Siswa
    Route::get('siswa', [SiswaController::class, 'index'])->name('siswa.index');
    Route::post('siswa', [SiswaController::class, 'store'])->name('siswa.store');
    Route::post('siswa/{kodeSiswa}', [SiswaController::class, 'update'])->name('siswa.update');
    Route::delete('siswa/{kodeSiswa}', [SiswaController::class, 'destroy'])->name('siswa.destroy');
    // Kelas
    Route::prefix('kelas')->name('kelas.')->group(function () {
        Route::get('/', [KelasController::class, 'index'])->name('index');
        Route::post('/', [KelasController::class, 'store'])->name('store');
        Route::post('/{kodeKelas}', [KelasController::class, 'update'])->name('update');
        Route::delete('/{kodeKelas}', [KelasController::class, 'destroy'])->name('destroy');
    });
    // Jurusan
    Route::prefix('jurusan')->name('jurusan.')->group(function () {
        Route::post('/', [JurusanController::class, 'store'])->name('store');
        Route::post('/{idJurusan}', [JurusanController::class, 'update'])->name('update');
        Route::delete('/{kodeJurusan}', [JurusanController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__ . '/settings.php';
