<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tentors_x_mapel extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function tentor(){
        return $this->belongsTo(Tentor::class);
    }

    public function mapel(){
        return $this->belongsTo(Mapel::class);
    }

}
