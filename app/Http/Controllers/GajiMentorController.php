<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\gaji_tentor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class GajiMentorController extends Controller
{
    public function index()
    {
        //get gajis
        $gajis = Gaji::when(request()->q, function($gajis) {
            $gajis = $gajis->where('gaji_name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //return inertia
        return Inertia::render('Gajis/Index', [
            'gajis' => $gajis,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Gajis/Create');
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
            'total_gaji'          => 'required',
            'bulan'   => 'required',
        ]);

        //create gajis
        Gaji::create([
            'total_gaji'          => $request->total_gaji,
            'bulan'   => $request->bulan,
        ]);

        //redirect
        return redirect()->route('gajis.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Gaji $gajis)
    {
        return Inertia::render('Gajis/Edit', [
            'gajis' => $gajis,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Gaji $gajis)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'total_gaji'          => 'required',
            'bulan'   => 'required',
        ]);

        //update gajis
        $gajis->update([
            'total_gaji'          => $request->total_gaji,
            'bulan'   => $request->bulan,
        ]);

        //redirect
        return redirect()->route('gajis.index');
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
        $gajis = Gaji::findOrFail($id);

        //delete
        $gajis->delete();

        //redirect
        return redirect()->route('gajis.index');
    }
}
