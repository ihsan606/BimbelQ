<?php

namespace App\Http\Controllers;

use App\Models\siswa_absensi;
use App\Models\Siswa;
use App\Models\jadwal_bimbel;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KehadiranSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $kehadirans = siswa_absensi::with('siswa','jadwal_bimbel.sesi', 'jadwal_bimbel.programs_x_kelas.program', 'jadwal_bimbel.programs_x_kelas.kelas', 'jadwal_bimbel.tentor.mapel')->orderBy('siswas_id')->orderBy('jadwal_bimbels_id')->get();

        return inertia('KehadiranSiswa/Index', [
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
        $siswas = Siswa::all();
        $jadwal_bimbels = jadwal_bimbel::with('siswa', 'programs_x_kelas.program', 'programs_x_kelas.kelas', 'sesi', 'tentor.mapel')->orderBy('siswas_id')->orderBy('programs_x_kelas_id')->orderBy('tentor_id')->orderBy('sesis_id')->get();

        return inertia('KehadiranSiswa/Create',[
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



        $kehadiran = siswa_absensi::create([
            'siswas_id'          => $request->siswa_id,
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
        $kehadirans = siswa_absensi::findOrFail($id)->with('siswa','jadwal_bimbel.siswa', 'jadwal_bimbel.programs_x_kelas.program', 'jadwal_bimbel.programs_x_kelas.kelas', 'jadwal_bimbel.sesi', 'jadwal_bimbel.tentor.mapel');

        if($kehadirans){
            $kehadirans = siswa_absensi::with('siswa','jadwal_bimbel.siswa', 'jadwal_bimbel.programs_x_kelas.program', 'jadwal_bimbel.programs_x_kelas.kelas', 'jadwal_bimbel.sesi', 'jadwal_bimbel.tentor.mapel')->whereId($id)->first();
        }

        $siswas = Siswa::all();
        $jadwal_bimbels = jadwal_bimbel::with('siswa', 'programs_x_kelas.program', 'programs_x_kelas.kelas', 'sesi', 'tentor.mapel')->orderBy('siswas_id')->orderBy('programs_x_kelas_id')->orderBy('tentor_id')->orderBy('sesis_id')->get();

        return inertia('KehadiranSiswa/Edit', [
            'kehadirans' => $kehadirans,
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
            'jadwal_bimbels_id'             => 'required',
            'absensi_status'        => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }




        $kehadiran = siswa_absensi::whereId($id)->first();

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

                return redirect()->route('kehadiransiswa.index')->with('success', 'Data Berhasil Diupdate!');
            }else{
                return response()->json([
                    'siswa_id' =>["duplicate combination siswa and jadwal"],
                    'jadwal_bimbel_id' => ["duplicate combination siswa and jadwal"]
                ], 422);

            }
        }





        //update kelas
        $kehadiran->update([
            'siswas_id'          => $request->siswa_id,
            'jadwal_bimbels_id'             => $request->jadwal_bimbels_id,
            'absensi_status'        => $request->absensi_status
        ]);

        return redirect()->route('kehadiransiswa.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kehadiran = siswa_absensi::findOrFail($id);

        $kehadiran->delete();

        if($kehadiran){
            return redirect()->route('kehadiransiswa.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }
}
