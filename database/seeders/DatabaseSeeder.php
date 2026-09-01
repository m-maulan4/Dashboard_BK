<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use App\Models\Siswa;
use App\Models\TahunAjaran;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate([
            'name' => fake()->name(),
            'email' => 'admin@email.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin'),
            'remember_token' => Str::random(10),
        ]);
        // Siswa::factory(30)->create();
        // TahunAjaran::factory()->create();
        // Jurusan::firstOrCreate([
        //     'jurusan' => 'ilmu pengetahuan alam',
        //     'kode_jurusan' => 'ipa',
        // ]);

        // Jurusan::firstOrCreate([
        //     'jurusan' => 'ilmu pengetahuan sosial',
        //     'kode_jurusan' => 'ips',
        // ]);
    }
}
