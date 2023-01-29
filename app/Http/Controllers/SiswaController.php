<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class SiswaController extends Controller
{
    public function index()
    {
        //get siswas
        $siswas = Siswa::when(request()->q, function($siswas) {
            $siswas = $siswas->where('siswa_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();

        return inertia('Siswas/Index', [
            'siswas' => $siswas
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Siswas/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'siswa_name'          => 'required|unique:siswas',
            'siswa_email'   => 'required',
            'siswa_phone_number'   => 'required',
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create sesi
        $siswas = Siswa::create([
            'siswa_name'          => $request->siswa_name,
            'siswa_email'   => $request->siswa_email,
            'siswa_phone_number'   => $request->siswa_phone_number,
        ]);

        //redirect
        // return redirect()->route('sesis.index');

        return $siswas;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    // public function edit(Sesi $sesi)
    {
        $siswa = Siswa::findOrFail($id);

        return inertia('Siswas/Edit', [
            'siswa' => $siswa,
        ]);
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
        $validator = Validator::make($request->all(), [
            'siswa_name'          => 'required|unique:siswas',
            'siswa_email'   => 'required',
            'siswa_phone_number'   => 'required',
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $siswa = Siswa::findOrFail($id);

        //update sesi
        $siswa->update([
            'siswa_name'          => $request->siswa_name,
            'siswa_email'   => $request->siswa_email,
            'siswa_phone_number'   => $request->siswa_phone_number,
        ]);

        return redirect()->route('siswas.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //find by ID
        $siswa = Siswa::findOrFail($id);

        //delete
        $siswa->delete();

        //redirect
        if($siswa){
            return redirect()->route('siswas.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
