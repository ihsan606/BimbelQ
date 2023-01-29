<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       $classes = Kelas::when(request()->q, function($classes) {
           $classes = $classes->where('kelas_name', 'like', '%'. request()->q . '%');
       })->latest('id')->get();

        return inertia('Class/Index', [
            'classes' => $classes
        ]);

        // return $classes;


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Class/Create');
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
            'kelas_name'          => 'required|unique:kelas'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $class = Kelas::create([
            'kelas_name' => $request->kelas_name
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
        $kelas = Kelas::findOrFail($id);



        return inertia('Class/Edit', [
            'kelas' => $kelas,
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
            'kelas_name'          => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $kelas = Kelas::findOrFail($id);





        //update kelas
        $kelas->update(['kelas_name' => $request->kelas_name]);

        return redirect()->route('class.index')->with('success', 'Data Berhasil Diupdate!');

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kelas = Kelas::findOrFail($id);

        $kelas->delete();

        if($kelas){
            return redirect()->route('class.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
