<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreKelasRequest extends FormRequest
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
            'jurusan' => ['required', 'exists:jurusan,id'],
            'tingkatan' => ['required'],
            'rombel' => ['required', 'max:1'],
        ];
    }
    public function messages(): array
    {
        return [
            'jurusan.required' => 'Pilih Jurusan Terlebih Dahulu',
            'jurusan.exists' => 'Jurusan Tidak Dikenal',
            'tingkatan.required' => 'Pilih Tingkatan Terlebih Dahulu',
            'rombel.required' => 'Kolom Rombel Tidak Boleh Kosong',
            'rombel.max' => 'Hanya Bisa Memasukan Satu Huruf atau Angka',
        ];
    }
}
