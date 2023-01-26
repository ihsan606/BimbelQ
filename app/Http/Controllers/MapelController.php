<?php

namespace App\Http\Controllers;

use App\Models\Mapel;
use Illuminate\Http\Request;

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

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'mapels_name'          => 'required|unique:mapels',
        ]);

        $class = Mapel::create([
            'mapels_name' => $request->mapels_name
        ]);

        return $class;
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

        return $mapels;
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

        return $mapels;

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
            return "sukses dihapus";
        }
    }
}
