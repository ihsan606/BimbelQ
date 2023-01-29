<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jadwal_bimbel extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function siswas(){
        return $this->hasMany(Siswa::class);
    }

    public function sesi(){
        return $this->belongsTo(Sesi::class);
    }

    public function program_x_kelas(){
        return $this->belongsTo(Programs_x_kelas::class);
    }



    public function tentor(){
        return $this->belongsTo(Tentor::class);
    }

    public function siswa_absensi(){
        return $this->hasMany(siswa_absensi::class);
    }

    public function tentor_absensi(){
        return $this->hasMany(tentor_absensi::class);
    }


}
