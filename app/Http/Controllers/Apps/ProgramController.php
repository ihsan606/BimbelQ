<?php

namespace App\Http\Controllers\Apps;

use Inertia\Inertia;
use App\Models\Program;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;


class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //get programs
        $programs = Program::when(request()->q, function($programs) {
            $programs = $programs->where('program_name', 'like', '%'. request()->q . '%');
        })->latest()->paginate(5);

        //return inertia
        return Inertia::render('Apps/Programs/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Apps/Programs/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'program_name'  => 'required|unique:programs',
        ]);

        //create program
        Program::create([
            'program_name'  => $request->program_name,
        ]);

        //redirect
        return redirect()->route('apps.programs.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program)
    {
        return Inertia::render('Apps/Programs/Edit', [
            'program' => $program,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Program $program)
    {
        /**
         * validate
         */
        $this->validate($request, [
            'program_name'  => 'required|unique:programs,program_name,'.$program->id,
        ]);

        //update program
        $program->update([
            'program_name'  => $request->name,
        ]);

        //redirect
        return redirect()->route('apps.programs.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //find by ID
        $program = Program::findOrFail($id);
        //delete
        $program->delete();

        //redirect
        return redirect()->route('apps.programs.index');
    }    
    
}
