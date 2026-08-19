<?php

use App\Http\Controllers\JurusanController;
use App\Http\Controllers\KelasController;
use Illuminate\Support\Facades\Route;

// Route::inertia('/', 'welcome')->name('home');
Route::get('/', fn() => redirect()->route('login'))->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    // Siswa
    Route::inertia('siswa', 'siswa/index')->name('siswa.index');
    // kelas
    Route::get('kelas', [KelasController::class, 'index'])->name('kelas.index');
    Route::post('kelas', [KelasController::class, 'store'])->name('kelas.store');
    // Jurusan
    Route::post('jurusan', [JurusanController::class, 'store'])->name('jurusan.store');
    // semester
    // Route::inertia('semester', 'semester/index')->name('semester.index');
});

require __DIR__ . '/settings.php';
