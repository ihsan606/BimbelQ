<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mapel extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function tentor_x_mapel(){
        return $this->hasMany(Tentor_x_mapel::class);
    }

    public function mapel(){
        return $this->hasMany(Mapel::class);
    }

    protected function mapelsName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucwords($value)
        );
    }

}
