<?php

namespace App\Http\Controllers;

use App\Models\Sesi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class SesiController extends Controller
{
    public function index()
    {
        //get sesis
        $sesis = Sesi::when(request()->q, function($sesis) {
            $sesis = $sesis->where('sesi_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();

        return inertia('Sesi/Index', [
            'sesis' => $sesis
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Sesi/Create');
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
            'sesi_name'          => 'required|unique:sesis',
            'sesi_mulai'   => 'required',
            'sesi_berakhir'   => 'required',
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create sesi
        $sesi = Sesi::create([
            'sesi_name'          => $request->sesi_name,
            'sesi_mulai'   => $request->sesi_mulai,
            'sesi_berakhir'   => $request->sesi_berakhir,
        ]);

        //redirect
        // return redirect()->route('sesis.index');

        return $sesi;

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
        $sesi = Sesi::findOrFail($id);

        return inertia('Sesi/Edit', [
            'sesi' => $sesi,
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
            'sesi_name'          => 'required',
            'sesi_mulai'   => 'required',
            'sesi_berakhir'   => 'required',
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $sesi = Sesi::findOrFail($id);

        //update sesi
        $sesi->update([
            'sesi_name'          => $request->sesi_name,
            'sesi_mulai'   => $request->sesi_mulai,
            'sesi_berakhir'   => $request->sesi_berakhir,
        ]);

        return redirect()->route('sesi.index')->with('success', 'Data Berhasil Diupdate!');
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
        $sesi = Sesi::findOrFail($id);

        //delete
        $sesi->delete();

        //redirect
        if($sesi){
            return redirect()->route('sesi.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
