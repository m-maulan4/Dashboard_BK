<?php

namespace Database\Factories;

use App\Models\TahunAjaran;
use Illuminate\Database\Eloquent\Factories\Factory;

use function Illuminate\Support\years;

/**
 * @extends Factory<TahunAjaran>
 */
class TahunAjaranFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return  [
            'tahun_ajaran' => now()->year . '/' . now()->subYear()->year,
            'tgl_mulai' => now(),
            'tgl_selesai' => now()->subYear(),
        ];
    }
}
