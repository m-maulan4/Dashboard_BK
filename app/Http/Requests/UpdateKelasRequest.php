<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateKelasRequest extends FormRequest
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
            'kode_jurusan' => ['required', 'exists:jurusan,kode_jurusan'],
            'tingkat' => ['required', 'in:7,8,9,10,11,12'],
            'rombel' => ['nullable']
        ];
    }
    public function messages()
    {
        return [
            'tingkat.required' => 'Tingkat wajib diisi.',
            'tingkat.in' => 'Tingkat tidak ditemukan.',

            'kode_jurusan.required' => 'Kode jurusan wajib diisi.',
            'kode_jurusan.exists' => 'Kode jurusan yang dipilih tidak ditemukan.',

            'rombel.nullable' => 'Rombel boleh dikosongkan.',
        ];
    }
}
