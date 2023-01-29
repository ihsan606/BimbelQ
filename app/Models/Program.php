<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function program_x_kelas(){
        return $this->hasMany(Program_x_kelas::class);
    }

    protected function programName(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => ucwords($value)
        );
    }


}
