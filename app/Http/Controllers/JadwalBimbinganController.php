<?php

namespace App\Http\Controllers;

// use App\Models\User;
use Illuminate\Http\Request;

class JadwalBimbinganController extends Controller
{
    //
    public function index(){
        return inertia('JadwalBimbingan/Index');
    }

    public function store(){
        return inertia('JadwalBimbingan/Create');
    }
}