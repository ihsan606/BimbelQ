<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class siswa_absensi extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function siswa(){
        return $this->belongsTo(Siswa::class, 'siswas_id', 'id');
    }

    public function jadwal_bimbel(){
        return $this->belongsTo(jadwal_bimbel::class, 'jadwal_bimbels_id', 'id');
    }


}
