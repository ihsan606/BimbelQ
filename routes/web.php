<?php

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

Route::resource('/users', \App\Http\Controllers\UserController::class);

Route::get('/owner', [\App\Http\Controllers\OwnerController::class, 'index']);

//prefix "apps"
Route::prefix('apps')->group(function() {
    
    //route resource programs
    Route::resource('/program', \App\Http\Controllers\Apps\ProgramController::class);

    //route resource sesis
    Route::resource('/sesi', \App\Http\Controllers\Apps\SesiController::class);

});
