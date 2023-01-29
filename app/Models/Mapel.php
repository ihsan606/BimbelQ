<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mapel extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function tentor(){
        return $this->hasMany(Tentor::class);
    }

//    public function jadwal_bimbel(){
//        return $this->hasMany(jadwal_bimbel::class);
//    }

    protected function mapelsName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucwords($value)
        );
    }

}
