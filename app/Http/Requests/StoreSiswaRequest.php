<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSiswaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string'],
            'nama_panggilan' => ['required', 'string'],
            'jk' => ['required', 'in:1,2'],
            'agama' => ['required', 'in:islam, kristen, katolik, hindu, buddha, konghucu'],
            'alamat' => ['required', 'min:20'],
            'no_orangtua' => ['required', 'min:10'],
            'kelas' => ['required', 'exists:kelas,kode_kelas']
        ];
    }
    public function messages(): array
    {
        return [
            // Nama
            'nama.required' => 'Nama lengkap wajib diisi.',
            'nama.string' => 'Nama lengkap harus berupa teks.',

            // Nama Panggilan
            'nama_panggilan.required' => 'Nama panggilan wajib diisi.',
            'nama_panggilan.string' => 'Nama panggilan harus berupa teks.',

            // Jenis Kelamin
            'jk.required' => 'Jenis kelamin wajib dipilih.',
            'jk.in' => 'Jenis kelamin tidak valid. Pilih laki-laki atau perempuan.',

            // Agama
            'agama.required' => 'Agama wajib dipilih.',
            'agama.in' => 'Agama tidak valid. Pilih dari: Islam, Kristen, Katolik, Hindu, Buddha, atau Konghucu.',

            // Alamat
            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.max' => 'Alamat maksimal 20 karakter.',

            // Nomor Orang Tua
            'no_orangtua.required' => 'Nomor telepon orang tua wajib diisi.',
            'no_orangtua.string' => 'Nomor telepon orang tua minimal 10 digit.',

            // Kelas
            'kelas.required' => 'Kelas wajib dipilih.',
            'kelas.exists' => 'Kelas yang dipilih tidak tersedia.'
        ];
    }
}
