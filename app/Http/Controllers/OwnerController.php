<?php

namespace App\Http\Controllers;

// use App\Models\User;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    //
    public function index(){
        return inertia('Users/JadwalBimbingan');
    }
}