<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Sesi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class SesiController extends Controller
{
    public function index()
    {
        //get sesis
        $sesis = Sesi::when(request()->q, function($sesis) {
            $sesis = $sesis->where('sesi_name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //return inertia
        return Inertia::render('Sesis/Index', [
            'sesis' => $sesis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Sesis/Create');
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
            'sesi_name'          => 'required|unique:sesis',
            'sesi_mulai'   => 'required',
            'sesi_berakhir'   => 'required',
        ]);

        //create sesi
        Sesi::create([
            'sesi_name'          => $request->sesi_name,
            'sesi_mulai'   => $request->sesi_mulai,
            'sesi_berakhir'   => $request->sesi_berakhir,
        ]);

        //redirect
        return redirect()->route('sesis.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Sesi $sesi)
    {
        return Inertia::render('Sesis/Edit', [
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
    public function update(Request $request, Sesi $sesi)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'sesi_name'          => 'required|unique:sesis,sesi_name,'.$sesi->id,
            'sesi_mulai'   => 'required',
            'sesi_berakhir'   => 'required',
        ]);

        //update sesi
        $sesi->update([
            'sesi_name'          => $request->sesi_name,
            'sesi_mulai'   => $request->sesi_mulai,
            'sesi_berakhir'   => $request->sesi_berakhir,
        ]);

        //redirect
        return redirect()->route('sesis.index');
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
        return redirect()->route('sesis.index');
    }
}
