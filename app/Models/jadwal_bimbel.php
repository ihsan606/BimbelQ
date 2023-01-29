<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class jadwal_bimbel extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function siswa(){
        return $this->belongsTo(Siswa::class,'siswas_id','id');
    }

    public function sesi(){
        return $this->belongsTo(Sesi::class, 'sesis_id', 'id');
    }

    public function programs_x_kelas(){
        return $this->belongsTo(Programs_x_kelas::class,'programs_x_kelas_id','id');
    }

    public function tentor(){
        return $this->belongsTo(Tentor::class, 'tentor_id', 'id');
    }

    public function siswa_absensi(){
        return $this->hasMany(siswa_absensi::class);
    }

    public function tentor_absensi(){
        return $this->hasMany(tentor_absensi::class);
    }


}
