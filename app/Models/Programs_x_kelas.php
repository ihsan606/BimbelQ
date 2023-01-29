<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programs_x_kelas extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function program(){
        return $this->belongsTo(Program::class, 'programs_id','id');
    }

    public function kelas(){
        return $this->belongsTo(Kelas::class, 'kelas_id', 'id');
    }

    public function jadwal_bimbel(){
        return $this->hasMany(jadwal_bimbel::class);
    }


}
