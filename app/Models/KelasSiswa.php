<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Attributes\Unguarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Table('kelas_siswa'), Unguarded, Hidden(['created_at', 'updated_at', 'deleted_at'])]
class KelasSiswa extends Model
{
    /** @use HasFactory<\Database\Factories\KelasSiswaFactory> */
    use HasFactory, SoftDeletes;
}
