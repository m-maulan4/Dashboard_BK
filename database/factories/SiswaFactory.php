<?php

namespace Database\Factories;

use App\Models\Siswa;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Siswa>
 */
class SiswaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        do {
            $kodeSiswa = strtoupper(Str::random(6));
        } while (Siswa::where('kode_siswa', $kodeSiswa)->exists());
        $namaDepan = fake()->firstName();
        $namaBelakang = fake()->lastName();

        return [
            'kode_siswa' => $kodeSiswa,
            'nama' => $namaDepan . ' ' . $namaBelakang,
            'nama_panggilan' => $namaDepan,
            'jk' => fake()->randomElement([1, 2]),
            'agama' => fake()->randomElement(['islam', 'kristen', 'katolik', 'hindu', 'buddha', 'konghucu']),
            'alamat' => fake()->address(),
            'no_orangtua' => fake()->phoneNumber(),
            'status' => 'aktif'

        ];
    }
}
