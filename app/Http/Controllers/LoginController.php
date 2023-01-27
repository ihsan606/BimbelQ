<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function index(){
        return inertia('Login/Index');
    }
    public function login(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'email'     => 'required',
            'password'  => 'required'
        ]);

        //if validation fails
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //get credentials from request
        $credentials = $request->only('email', 'password');

        //if auth failed
        if(!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau Password Anda salah'
            ], 401);

//            return inertia('Login/Index',[
//                'success' => false,
//                'message' => 'Email atau Password Anda salah'
//            ]);
        }

        //if auth success
        return response()->json([
            'success' => true,
            'user'    => auth()->user(),
            'token'   => $token
        ], 200);

//        return inertia('Login/Index',[
//            'success' => true,
//            'user'    => auth()->user(),
//            'token'   => $token
//        ]);


    }
}
