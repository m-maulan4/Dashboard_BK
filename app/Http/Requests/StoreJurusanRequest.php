<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreJurusanRequest extends FormRequest
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
            'singkatan' => ['required', 'string']
        ];
    }
    public function messages(): array
    {
        return [
            'nama.required' => 'Kolom Nama Jurusan Tidak Boleh Kosong',
            'nama.string' => 'Kolom Nama Hanya Menerima Huruf Saja',
            'singkatan.required' => 'Kolom Nama Jurusan Tidak Boleh Kosong',
            'singkatan.string' => 'Kolom Nama Hanya Menerima Huruf Saja',
        ];
    }
}
