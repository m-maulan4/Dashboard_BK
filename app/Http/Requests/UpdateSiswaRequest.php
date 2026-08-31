<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSiswaRequest extends FormRequest
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
            'agama' => ['required', 'in:islam,kristen,katolik,hindu,buddha,konghucu'],
            'alamat' => ['required', 'min:20'],
            'no_orangtua' => ['required', 'min:10'],
            'kelas' => ['required', 'exists:kelas,kode_kelas'],
            'status' => ['required', 'in:aktif,nonaktif,lulus,pindah']
        ];
    }
}
