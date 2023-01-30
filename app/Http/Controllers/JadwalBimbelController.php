<?php

namespace App\Http\Controllers;

use App\Models\jadwal_bimbel;
use App\Models\Kelas;
use App\Models\Program;
use App\Models\Programs_x_kelas;
use App\Models\Sesi;
use App\Models\Siswa;
use App\Models\siswa_absensi;
use App\Models\Tentor;
use App\Models\tentor_absensi;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JadwalBimbelController extends Controller
{
    public function index(){
        $jadwal_bimbels =  Sesi::with('tentors.jadwal_bimbels.siswa','tentors.jadwal_bimbels.programs_x_kelas.program','tentors.jadwal_bimbels.programs_x_kelas.kelas')->get();


        return inertia('JadwalBimbel/Index',[
            'jadwal_bimbels' => $jadwal_bimbels
        ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $siswas = Siswa::all();
        $sesis = Sesi::all();
        $program_x_kelases = Programs_x_kelas::with('program','kelas')->get();
        $tentors = Tentor::all();

        return inertia('JadwalBimbel/Create',[
            'siswas' => $siswas,
            'sesis' => $sesis,
            'program_x_kelases' => $program_x_kelases,
            'tentors' => $tentors
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
            'sesi_id'             => 'required',
            'programs_x_kelas_id'        => 'required',
            'tentor_id'        => 'required'

        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        $checkSiswa = jadwal_bimbel::where([
            ['siswas_id',"=",$request->siswa_id],
            ['sesis_id',"=",$request->sesis_id]
        ])->first();

//        $checkTentor = jadwal_bimbel::where([
//            ['tentor_id',"=",$request->tentor_id],
//            ['programs_x_kelas_id',"=",$request->programs_x_kelas_id]
//        ])->first();
//
//        if($checkTentor){
//            return response()->json([
//                'tentor_id' =>["mentor sudah mengajar di kelas/program lain pada sesi yang sama"],
//                'programs_x_kelas_id' => ["mentor sudah mengajar di kelas/program lain pada sesi yang sama"]
//            ], 422);
//        }

        if($checkSiswa){
            return response()->json([
                'siswas_id' =>["siswa sudah mengambil mapel lain di sesi yang sama"],
                'sesis_id' => ["siswa sudah mengambil mapel lain di sesi yang sama"]
            ], 422);
        }



        $jadwal = jadwal_bimbel::create([
            'siswas_id'          => $request->siswa_id,
            'sesis_id'             =>  $request->sesi_id,
            'programs_x_kelas_id'        => $request->programs_x_kelas_id,
            'tentor_id'        => $request->tentor_id
        ]);

        return $jadwal;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tarif = jadwal_bimbel::findOrFail($id);

        if($tarif){
            $tarif = jadwal_bimbel::with('siswa','sesi','programs_x_kelas.program','tentor.mapel','programs_x_kelas.kelas')->whereId($id)->first();
        }

        $programs = Program::all();
        $clases = Kelas::all();

        $siswas = Siswa::all();
        $sesis = Sesi::all();
        $program_x_kelases = Programs_x_kelas::with('program','kelas')->get();
        $tentors = Tentor::all();



        return inertia('JadwalBimbel/Edit', [
            'jadwal'=> $tarif,
            'siswas' => $siswas,
            'sesis' => $sesis,
            'program_x_kelases' => $program_x_kelases,
            'tentors' => $tentors
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
            'sesi_id'             => 'required',
            'programs_x_kelas_id'        => 'required',
            'tentor_id'        => 'required'

        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }


        $jadwal = jadwal_bimbel::whereId($id)->first();




        $checkSiswa = jadwal_bimbel::where([
            ['siswas_id',"=",$request->siswa_id],
            ['sesis_id',"=",$request->sesis_id]
        ])->first();


        if($checkSiswa){
            return response()->json([
                'siswas_id' =>["siswa sudah mengambil mapel lain di sesi yang sama"],
                'sesis_id' => ["siswa sudah mengambil mapel lain di sesi yang sama"]
            ], 422);
        }


        $jadwal->update([
            'siswas_id'          => $request->siswa_id,
            'sesis_id'             =>  $request->sesi_id,
            'programs_x_kelas_id'        => $request->programs_x_kelas_id,
            'tentor_id'        => $request->tentor_id
        ]);











        return redirect()->route('jadwal-bimbels.index')->with('success', 'Data Berhasil Diupdate!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $jadwal = jadwal_bimbel::whereId($id)->first();

        if($jadwal){
          $absens_siswa =  siswa_absensi::where('jadwal_bimbels_id',$jadwal->id)->get();
          $absens_tentor =  tentor_absensi::where('jadwal_bimbels_id',$jadwal->id)->get();
          if($absens_tentor){
              foreach ($absens_tentor as $absen){
                  $absen->delete();
              }
          }

          if($absens_siswa){
              foreach ($absens_siswa as $absen){
                  $absen->delete();
              }
          }


        }

        $jadwal->delete();

        if($jadwal){
            return redirect()->route('jadwal-bimbels.index')->with('success', 'Data Berhasil Dihapus!');
        }
    }


}
