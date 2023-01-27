<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Program;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    //
    public function index()
    {
        //get programs
        $programs = Program::when(request()->q, function($programs) {
            $programs = $programs->where('program_name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //return inertia
        return Inertia::render('Programs/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Programs/Create');
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
            'program_name'          => 'required|unique:programs',
        ]);

        //create program
        $program = Program::create([
            'program_name'          => $request->program_name,
        ]);

        // Program::create([
        //     'program_name'          => $request->program_name,
        // ]);

        //redirect
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

        // return Inertia::render('Programs/Edit', [
        //     'program' => $program,
        // ]);

        return $program;
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
        /**
         * validate
         */
        $this->validate($request, [
            'program_name'          => 'required',
        ]);

        $program = Program::findOrFail($id);


        // $this->validate($request, [
        //     'program_name'          => 'required|unique:programs,program_name,'.$program->id,
        // ]);

        //update program
        $program->update(['program_name' => $request->program_name]);

        // $program->update([
        //     'program_name'          => $request->program_name,
        // ]);

        //redirect
        return $program;
        // return redirect()->route('programs.index');
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
            return "sukses dihapus";
        }

        // return redirect()->route('programs.index');
    }
}
