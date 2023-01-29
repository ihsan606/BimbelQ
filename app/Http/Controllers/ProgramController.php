<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProgramController extends Controller
{
    //
    public function index()
    {
        //get programs
        $programs = Program::when(request()->q, function($programs) {
            $programs = $programs->where('program_name', 'like', '%'. request()->q . '%');
        })->latest('id')->get();

        return inertia('Program/Index', [
            'programs' => $programs
        ]);

        // return $programs;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Program/Create');
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
            'program_name'          => 'required|unique:programs'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $program = Program::create([
            'program_name'          => $request->program_name,
        ]);

        return $program;
        // return redirect()->route('programs.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    // public function edit(Program $program)
    {
        $program = Program::findOrFail($id);

        return inertia('Program/Edit', [
            'program' => $program,
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
            'program_name'          => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $program = Program::findOrFail($id);

        //update program
        $program->update([
            'program_name'          => $request->program_name,
        ]);

        return redirect()->route('program.index')->with('success', 'Data Berhasil Diupdate!');
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
        $program = Program::findOrFail($id);

        //delete
        $program->delete();

        //redirect
        if($program){
            return redirect()->route('program.index')->with('success', 'Data Berhasil Dihapus!');
        }

    }
}
