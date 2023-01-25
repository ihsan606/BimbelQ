<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class gaji_tentor extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function tentor(){
        return $this->belongsTo(Tentor::class);
    }
}
