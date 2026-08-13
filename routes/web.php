<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    // Siswa
    Route::inertia('siswa', 'siswa/index')->name('siswa.index');
});

require __DIR__ . '/settings.php';
