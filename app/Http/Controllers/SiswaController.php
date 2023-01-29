<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Siswa;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get siswas
        $siswas = Siswa::when(request()->q, function($siswas) {
            $siswas = $siswas->where('name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //return inertia
        // return inertia('Siswas/Index', [
        //     'siswas' =>$siswas
        // ]);
        return Inertia::render('Siswas/Index', [
            'siswas' =>$siswas
        ]);
        //return $siswas;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Siswas/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'siswa_email'      => 'required|email|unique:siswas',
            'siswa_password'   => 'required|confirmed',
            'siswa_nama'   => 'required',
        ]);

        //create siswa
        $siswa = Siswa::create([
            'siswa_email'      => $request->siswa_email,
            'siswa_password'   => bcrypt($request->siswa_password),
            'siswa_name'   => $request->siswa_nama,
        ]);

        //redirect
        return redirect()->route('siswas.index');
        // return $siswa;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $siswas = Siswa::findOrFail($id);

        return $siswas;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'siswa_email'      => 'required|email|unique:siswas',
            'siswa_password'   => 'required|confirmed',
            'siswa_nama'   => 'required',
        ]);

        $siswas = Siswa::findOrFail($id);

        //update siswas
        $siswas->update([
            'siswa_email'      => $request->siswa_email,
            'siswa_password'   => bcrypt($request->siswa_password),
            'siswa_nama'   => $request->siswa_nama,
        ]);

        //redirect
        return $siswas;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $siswas = Siswa::findOrFail($id);

        $siswas->delete();

        if($siswas){
            return "sukses dihapus";
        }
    }
}
