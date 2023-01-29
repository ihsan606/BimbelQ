<?php

namespace App\Http\Controllers;

use App\Models\siswa_absensi;
use App\Models\Siswa;
use App\Models\jadwal_bimbel;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SiswaAbsensiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $siswa_absensis = siswa_absensi::with('siswa','jadwal_bimbel')->orderBy('siswas_id')->orderBy('jadwal_bimbels_id')->get();

        return inertia('SiswaAbsensis/Index', [
            'siswa_absensis' => $siswa_absensis
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
        $siswas = Siswa::all();
        $jadwal_bimbels = jadwal_bimbel::all();

        return inertia('SiswaAbsensis/Create',[
            'siswas' => $siswas,
            'jadwal_bimbels' => $jadwal_bimbels
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
            'siswa_id'          => 'required',
            'jadwal_bimbel_id'             => 'required',
            'absensi_status'        => 'required'

        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $siswa = Siswa::findOrFail($request->siswa_id);

            $jadwal_bimbel = jadwal_bimbel::findOrFail($request->jadwal_bimbel_id);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' =>[$e->getMessage()]], 422);

        }

        $checkSiswaJadwal = siswa_absensi::where([
            ['siswas_id',"=",$request->siswa_id],
            ['jadwal_bimbels_id',"=",$request->jadwal_bimbel_id]
        ])->first();

        if($checkSiswaJadwal){
            return response()->json([
                'siswa_id' =>["duplicate combination siswa and jadwal"],
                'jadwal_bimbel_id' => ["duplicate combination siswa and jadwal"]
            ], 422);
        }



        $siswa_absensi = siswa_absensi::create([
            'siswas_id'          => $request->siswa_id,
            'jadwal_bimbels_id'             => $request->jadwal_bimbel_id,
            'absensi_status'        => $request->absensi_status
        ]);

        return $siswa_absensi;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $siswa_absensi = siswa_absensi::findOrFail($id)->with('siswa','jadwal_bimbel');

        if($siswa_absensi){
            $siswa_absensi = siswa_absensi::with('siswa','jadwal_bimbel')->whereId($id)->first();
        }

        $siswas = Siswa::all();
        $jadwal_bimbels = jadwal_bimbel::all();



        return inertia('SiswaAbsensis/Edit', [
            'siswa_absensi' => $siswa_absensi,
            'siswas' => $siswas,
            'jadwal_bimbels' => $jadwal_bimbels
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
            'siswa_id'          => 'required',
            'jadwal_bimbel_id'             => 'required',
            'absensi_status'        => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }




        $siswa_absensi = siswa_absensi::whereId($id)->first();

        $checkSiswaJadwal = siswa_absensi::where([
            ['siswas_id',"=",$request->siswa_id],
            ['jadwal_bimbels_id',"=",$request->jadwal_bimbels_id]
        ])->first();

        if($checkSiswaJadwal){
//            return "ada yang sama";
            if($checkSiswaJadwal->id == $id){
                $checkSiswaJadwal->update([
                    'siswas_id'          => $request->siswa_id,
                    'jadwal_bimbels_id'             => $request->jadwal_bimbels_id,
                    'absensi_status'        => $request->absensi_status
                ]);

                return redirect()->route('siswaabsensis.index')->with('success', 'Data Berhasil Diupdate!');
            }else{
                return response()->json([
                    'siswa_id' =>["duplicate combination siswa and jadwal"],
                    'jadwal_bimbel_id' => ["duplicate combination siswa and jadwal"]
                ], 422);

            }
        }





        //update kelas
        $siswa_absensi->update([
            'siswas_id'          => $request->siswa_id,
            'jadwal_bimbels_id'             => $request->jadwal_bimbels_id,
            'absensi_status'        => $request->absensi_status
        ]);

        return redirect()->route('siswaabsensis.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $siswa_absensi = siswa_absensi::findOrFail($id);

        $siswa_absensi->delete();

        if($siswa_absensi){
            return redirect()->route('siswaabsensis.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
