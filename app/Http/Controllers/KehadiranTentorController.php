<?php

namespace App\Http\Controllers;

use App\Models\tentor_absensi;
use App\Models\Tentor;
use App\Models\jadwal_bimbel;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KehadiranTentorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kehadirans = tentor_absensi::with('tentor','jadwal_bimbel.sesi', 'jadwal_bimbel.programs_x_kelas.program', 'jadwal_bimbel.programs_x_kelas.kelas', 'jadwal_bimbel.tentor.mapel')->orderBy('tentors_id')->orderBy('jadwal_bimbels_id')->get();

        return inertia('KehadiranTentor/Index', [
            'kehadirans' => $kehadirans
        ]);

    //    return $kehadirans;


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $tentors = Tentor::all();
        $jadwal_bimbels = jadwal_bimbel::with('tentor', 'programs_x_kelas.program', 'programs_x_kelas.kelas', 'sesi', 'tentor.mapel')->orderBy('tentor_id')->orderBy('programs_x_kelas_id')->orderBy('siswas_id')->orderBy('sesis_id')->get();

        return inertia('KehadiranTentor/Create',[
            'tentors' => $tentors,
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
            'tentors_id'          => 'required',
            'jadwal_bimbel_id'             => 'required',
            'absensi_status'        => 'required'

        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $tentor = Tentor::findOrFail($request->tentors_id);

            $jadwal_bimbel = jadwal_bimbel::findOrFail($request->jadwal_bimbel_id);

        } catch (ModelNotFoundException $e) {
            return response()->json(['error' =>[$e->getMessage()]], 422);

        }

        $checkTentorJadwal = tentor_absensi::where([
            ['tentors_id',"=",$request->tentors_id],
            ['jadwal_bimbels_id',"=",$request->jadwal_bimbel_id]
        ])->first();

        if($checkTentorJadwal){
            return response()->json([
                'tentor_id' =>["duplicate combination tentor and jadwal"],
                'jadwal_bimbel_id' => ["duplicate combination tentor and jadwal"]
            ], 422);
        }



        $kehadiran = tentor_absensi::create([
            'tentors_id'          => $request->tentors_id,
            'jadwal_bimbels_id'             => $request->jadwal_bimbel_id,
            'absensi_status'        => $request->absensi_status
        ]);

        return $kehadiran;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $kehadirans = tentor_absensi::findOrFail($id)->with('tentor','jadwal_bimbel.tentor', 'jadwal_bimbel.programs_x_kelas.program', 'jadwal_bimbel.programs_x_kelas.kelas', 'jadwal_bimbel.sesi', 'jadwal_bimbel.tentor.mapel');

        if($kehadirans){
            $kehadirans = tentor_absensi::with('tentor','jadwal_bimbel.tentor', 'jadwal_bimbel.programs_x_kelas.program', 'jadwal_bimbel.programs_x_kelas.kelas', 'jadwal_bimbel.sesi', 'jadwal_bimbel.tentor.mapel')->whereId($id)->first();
        }

        $tentors = Tentor::all();
        $jadwal_bimbels = jadwal_bimbel::with('tentor', 'programs_x_kelas.program', 'programs_x_kelas.kelas', 'sesi', 'tentor.mapel')->orderBy('tentor_id')->orderBy('programs_x_kelas_id')->orderBy('siswas_id')->orderBy('sesis_id')->get();

        return inertia('KehadiranTentor/Edit', [
            'kehadirans' => $kehadirans,
            'tentors' => $tentors,
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
            'tentors_id'          => 'required',
            'jadwal_bimbels_id'             => 'required',
            'absensi_status'        => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }




        $kehadiran = tentor_absensi::whereId($id)->first();

        $checkTentorJadwal = tentor_absensi::where([
            ['tentors_id',"=",$request->tentors_id],
            ['jadwal_bimbels_id',"=",$request->jadwal_bimbels_id]
        ])->first();

        if($checkTentorJadwal){
//            return "ada yang sama";
            if($checkTentorJadwal->id == $id){
                $checkTentorJadwal->update([
                    'tentors_id'          => $request->tentors_id,
                    'jadwal_bimbels_id'             => $request->jadwal_bimbels_id,
                    'absensi_status'        => $request->absensi_status
                ]);

                return redirect()->route('kehadirantentor.index')->with('success', 'Data Berhasil Diupdate!');
            }else{
                return response()->json([
                    'tentor_id' =>["duplicate combination tentor and jadwal"],
                    'jadwal_bimbel_id' => ["duplicate combination tentor and jadwal"]
                ], 422);

            }
        }





        //update kelas
        $kehadiran->update([
            'tentors_id'          => $request->tentors_id,
            'jadwal_bimbels_id'             => $request->jadwal_bimbels_id,
            'absensi_status'        => $request->absensi_status
        ]);

        return redirect()->route('kehadirantentor.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kehadiran = tentor_absensi::findOrFail($id);

        $kehadiran->delete();

        if($kehadiran){
            return redirect()->route('kehadirantentor.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
