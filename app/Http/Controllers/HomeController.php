<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Tentor;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    function index(){
        $siswas = Siswa::when(request()->q, function($siswas) {
            $siswas = $siswas->where('siswa_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();

        $tentors = Tentor::when(request()->q, function($tentors) {
            $tentors = $tentors->where('tentors_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();
 
         return inertia('Home/Index', [
             'siswas' => $siswas,
             'tentors' => $tentors
         ]);
    }
}
