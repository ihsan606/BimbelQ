<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sesi extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function jadwal_bimbels(){
        return $this->hasMany(jadwal_bimbel::class);
    }

    public function tentors(){
        return $this->hasMany(Tentor::class);
    }


}
