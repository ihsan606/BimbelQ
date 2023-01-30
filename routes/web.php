<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[\App\Http\Controllers\RegisterController::class, 'store']);

Route::post('/auth/login',[\App\Http\Controllers\LoginController::class, 'login'])->name('login');

Route::get('/login',[\App\Http\Controllers\LoginController::class,'index']);

Route::get('/register',[\App\Http\Controllers\RegisterController::class,'index']);

Route::get('/home',[\App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::post('/auth/logout',\App\Http\Controllers\LogoutController::class)->name('logout');

Route::resource('/users', \App\Http\Controllers\UserController::class);

Route::resource('/class', \App\Http\Controllers\ClassController::class);

Route::resource('/mapels', \App\Http\Controllers\MapelController::class);

Route::resource('/siswas', \App\Http\Controllers\SiswaController::class);

Route::resource('/tarifs', \App\Http\Controllers\TarifController::class);


Route::resource('/jadwal-bimbels',\App\Http\Controllers\JadwalBimbelController::class);

Route::get('/jadwalbimbingan', [\App\Http\Controllers\JadwalBimbinganController::class, 'index']);

Route::get('/jadwalbimbingan/create', [\App\Http\Controllers\JadwalBimbinganController::class, 'store']);

Route::resource('/program', \App\Http\Controllers\ProgramController::class);

Route::resource('/sesi', \App\Http\Controllers\SesiController::class);

Route::resource('/tentors', \App\Http\Controllers\TentorController::class);

Route::resource('/kehadiransiswa', \App\Http\Controllers\KehadiranSiswaController::class);

Route::resource('/kehadirantentor', \App\Http\Controllers\KehadiranTentorController::class);
Route::get('/tentor-by-sesi',[\App\Http\Controllers\TentorController::class,'getBySesiId']);


