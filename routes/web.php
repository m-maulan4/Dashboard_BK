<?php

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
});

require __DIR__ . '/settings.php';
