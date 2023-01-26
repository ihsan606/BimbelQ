<?php

namespace App\Http\Controllers;

use App\Models\Tentor;
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
        $tentor = Tentor::when(request()->q, function($tentor) {
            $tentor = $tentor->where('mapels_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();

        return inertia('Tentors/Index', [
            'tentors' => $tentor
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
            'tentor_email'      => 'required|email|unique:tentos',
            'tentor_password'   => 'required|confirmed',
            'tentor_nama'   => 'required',
        ]);

        $class = Mapel::create([
            'tentor_email'      => $request->tentor_email,
            'tentor_password'   => bcrypt($request->tentor_password),
            'tentor_nama'   => $request->tentor_nama,
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
        $tentor = Tentor::findOrFail($id);

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
            'tentor_email'      => 'required|email|unique:tentos',
            'tentor_password'   => 'required|confirmed',
            'tentor_nama'   => 'required',
        ]);

        $tentor = Mapel::findOrFail($id);





        //update tentor
        $tentor->update([
            'tentor_email'      => $request->tentor_email,
            'tentor_password'   => bcrypt($request->tentor_password),
            'tentor_nama'   => $request->tentor_nama,
        ]);

        return $tentor;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tentor = Mentor::findOrFail($id);

        $tentor->delete();

        if($tentor){
            return "sukses dihapus";
        }
    }
}
