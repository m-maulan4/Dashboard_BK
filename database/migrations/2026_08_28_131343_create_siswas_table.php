<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->string('kode_siswa', 6);
            $table->string('nama');
            $table->string('nama_panggilan')->unique();
            $table->tinyInteger('jk');
            $table->enum('agama', ['islam', 'kristen', 'katolik', 'hindu', 'buddha', 'konghucu']);
            $table->text('alamat');
            $table->string('no_orangtua');
            $table->enum('status', ['aktif', 'nonaktif', 'lulus', 'pindah']);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
