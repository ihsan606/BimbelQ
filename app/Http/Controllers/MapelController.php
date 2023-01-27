<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Mapel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MapelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mapels = Mapel::when(request()->q, function($mapels) {
            $mapels = $mapels->where('mapels_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();

        return inertia('Mapels/Index', [
            'mapels' => $mapels
        ]);


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Mapels/Create');
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
            'mapels_name'          => 'required|unique:mapels'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mapels = Mapel::create([
            'mapels_name' => $request->mapels_name
        ]);

        return $mapels;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $mapels = Mapel::findOrFail($id);

        return inertia('Mapels/Edit', [
            'mapel' => $mapels,
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
        $this->validate($request, [
            'mapels_name'          => 'required',
        ]);

        $mapels = Mapel::findOrFail($id);





        //update mapels
        $mapels->update(['mapels_name' => $request->mapels_name]);

        return redirect()->route('mapels.index')->with('success', 'Data Berhasil Diupdate!');


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mapels = Mapel::findOrFail($id);

        $mapels->delete();

        if($mapels){
            return redirect()->route('mapels.index')->with('success', 'Data Berhasil Dihapus!');

        }
    }
}
