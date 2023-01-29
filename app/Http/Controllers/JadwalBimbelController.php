<?php

namespace App\Http\Controllers;

use App\Models\Sesi;
use Illuminate\Http\Request;

class JadwalBimbelController extends Controller
{
    public function index(){
        $jadwal_bimbels =  Sesi::with('tentors.jadwal_bimbels.siswa','tentors.jadwal_bimbels.programs_x_kelas')->get();


        return inertia('JadwalBimbel/Index',[
            'jadwal_bimbels' => $jadwal_bimbels
        ]);


    }
}
