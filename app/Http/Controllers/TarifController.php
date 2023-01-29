<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Program;
use App\Models\Programs_x_kelas;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TarifController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programs_x_kelas = Programs_x_kelas::with('program','kelas')->orderBy('programs_id')->orderBy('kelas_id')->get();

        return inertia('Tarifs/Index', [
            'tarifs' => $programs_x_kelas
        ]);

//        return $programs_x_kelas;


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $programs = Program::all();
        $clases = Kelas::all();

        return inertia('Tarifs/Create',[
            'programs' => $programs,
            'clases' => $clases
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
            'program_id'          => 'required',
            'kelas_id'             => 'required',
            'tarif_belajar'        => 'required',
            'tarif_tentor'        => 'required'

        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $program = Program::findOrFail($request->program_id);

            $kelas = Kelas::findOrFail($request->kelas_id);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' =>[$e->getMessage()]], 422);

        }

        $checkTarif = Programs_x_kelas::where([
            ['programs_id',"=",$request->program_id],
            ['kelas_id',"=",$request->kelas_id]
        ])->first();

        if($checkTarif){
            return response()->json([
                'program_id' =>["duplicate combination program and kelas"],
                'kelas_id' => ["duplicate combination program and kelas"]
            ], 422);
        }



        $tarif = Programs_x_kelas::create([
            'programs_id'          => $request->program_id,
            'kelas_id'             => $request->kelas_id,
            'tarif_belajar'        => $request->tarif_belajar,
            'tarif_tentor'        => $request->tarif_tentor
        ]);

        return $tarif;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tarif = Programs_x_kelas::findOrFail($id)->with('program','kelas');

        if($tarif){
            $tarif = Programs_x_kelas::with('program','kelas')->whereId($id)->first();
        }

        $programs = Program::all();
        $clases = Kelas::all();



        return inertia('Tarifs/Edit', [
            'tarif' => $tarif,
            'programs' => $programs,
            'clases' => $clases
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
            'program_id'          => 'required',
            'kelas_id'             => 'required',
            'tarif_belajar'        => 'required',
            'tarif_tentor'        => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }




        $tarif = Programs_x_kelas::whereId($id)->first();

        $checkTarif = Programs_x_kelas::where([
            ['programs_id',"=",$request->program_id],
            ['kelas_id',"=",$request->kelas_id]
        ])->first();

        if($checkTarif){
//            return "ada yang sama";
            if($checkTarif->id == $id){
                $checkTarif->update([
                    'programs_id'          => $request->program_id,
                    'kelas_id'             => $request->kelas_id,
                    'tarif_belajar'        => $request->tarif_belajar,
                    'tarif_tentor'        => $request->tarif_tentor
                ]);

                return redirect()->route('tarifs.index')->with('success', 'Data Berhasil Diupdate!');
            }else{
                return response()->json([
                    'program_id' =>["duplicate combination program and kelas"],
                    'kelas_id' => ["duplicate combination program and kelas"]
                ], 422);

            }
        }





        //update kelas
        $tarif->update([
            'programs_id'          => $request->program_id,
            'kelas_id'             => $request->kelas_id,
            'tarif_belajar'        => $request->tarif_belajar,
            'tarif_tentor'        => $request->tarif_tentor
        ]);

        return redirect()->route('tarifs.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tarif = Programs_x_kelas::findOrFail($id);

        $tarif->delete();

        if($tarif){
            return redirect()->route('tarifs.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
