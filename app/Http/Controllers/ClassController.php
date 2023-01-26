<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;

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

        return inertia('Owner/Class/Index', [
            'classes' => $classes
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
            'kelas_name'          => 'required',
        ]);

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

        return $kelas;
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
            'kelas_name'          => 'required',
        ]);

        $kelas = Kelas::findOrFail($id);





        //update kelas
        $kelas->update(['kelas_name' => $request->kelas_name]);

        return $kelas;

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
            return "sukses dihapus";
        }
    }
}
