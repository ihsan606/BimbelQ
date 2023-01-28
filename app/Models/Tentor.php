<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tentor extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function tentor_absensi(){
        return $this->hasMany(tentor_absensi::class);
    }

    public function jadwal_bimbel(){
        return $this->hasMany(jadwal_bimbel::class);
    }

    public function gaji_tentor(){
        return $this->hasMany(gaji_tentor::class);
    }

    public function mapel(){
        return $this->belongsTo(Mapel::class);
    }

}
