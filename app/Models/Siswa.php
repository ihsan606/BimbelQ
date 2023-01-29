<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;
    protected $guarded = ['id'];


    public function siswa_absensi(){
        return $this->hasMany(siswa_absensi::class);
    }

    public function jadwal_bimbel(){
        return $this->hasMany(jadwal_bimbel::class);
    }

    public function tagihan_siswa(){
        return $this->hasMany(tagihan_siswa::class);
    }

    protected function siswaName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucwords($value)
        );
    }


}
