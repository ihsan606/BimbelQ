<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tentor_absensi extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function tentor(){
        return $this->belongsTo(Tentor::class);
    }

    public function jadwal_bimbel(){
        return $this->belongsTo(jadwal_bimbel::class);
    }


}
