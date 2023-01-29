<?php

namespace App\Http\Controllers;

use App\Models\Tentor;
use App\Models\Mapel;
use App\Models\Sesi;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TentorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tentors = Tentor::with('mapel', 'sesi')->orderBy('mapels_id')->orderBy('sesi_id')->get();

        return inertia('Tentors/Index', [
            'tentors' => $tentors
        ]);

//        return $programs_x_kelas;


    }

    public function getBySesiId(Request $request){
        if($request->id){
            $tentors = Tentor::with('mapel')->where('sesi_id', $request->id)->get();
            return $tentors;
        }

        return Tentor::with('mapel')->get();


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $mapels = Mapel::all();
        $sesis = Sesi::all();

        return inertia('Tentors/Create',[
            'mapels' => $mapels,
            'sesis' => $sesis
        ]);
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
            'mapels_id'          => 'required',
            'sesi_id'          => 'required',
            'tentors_name'        => 'required',
            'tentors_email'        => 'required',
            'tentors_phone_number'        => 'required'

        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $mapels = Mapel::findOrFail($request->mapels_id);
            $sesi = Sesi::findOrFail($request->sesi_id);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' =>[$e->getMessage()]], 422);

        }

        $tentor = Tentor::create([
            'mapels_id'             => $request->mapels_id,
            'sesi_id'             => $request->sesi_id,
            'tentors_name'        => $request->tentors_name,
            'tentors_email'        => $request->tentors_email,
            'tentors_phone_number'        => $request->tentors_phone_number
        ]);

        return $tentor;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tentor = Tentor::findOrFail($id)->with('mapel', 'sesi');

        if($tentor){
            $tentor = Tentor::with('mapel', 'sesi')->whereId($id)->first();
        }

        $mapels = Mapel::all();
        $sesis = Sesi::all();

        return inertia('Tentors/Edit', [
            'tentor' => $tentor,
            'mapels' => $mapels,
            'sesis' => $sesis
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
            'sesi_id'          => 'required',
            'mapels_id'          => 'required',
            'sesi_id'          => 'required',
            'tentors_name'        => 'required',
            'tentors_email'        => 'required',
            'tentors_phone_number'        => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $tentor = Tentor::whereId($id)->first();

        //update kelas
        $tentor->update([
            'sesi_id'          => $request->sesi_id,
            'mapels_id'          => $request->mapels_id,
            'sesi_id'          => $request->sesi_id,
            'tentors_name'        => $request->tentors_name,
            'tentors_email'        => $request->tentors_email,
            'tentors_phone_number'        => $request->tentors_phone_number
        ]);

        return redirect()->route('tentors.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tentor = Tentor::findOrFail($id);

        $tentor->delete();

        if($tentor){
            return redirect()->route('tentors.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
