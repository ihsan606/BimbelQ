<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function program_x_kelas(){
        return $this->hasMany(Program_x_kelas::class);
    }


}
