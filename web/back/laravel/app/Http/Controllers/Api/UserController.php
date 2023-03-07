<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Cookie;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = new User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->verified = false;

        if ($user->save()) {
            return response()->json(true, Response::HTTP_CREATED);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->verified) {
                $token = $user->createToken('token')->plainTextToken;
                $cookie = cookie('cookie_token', $token, 60 * 24);
                return response()->json(["login" => true, "token" => $token, "user" => $user], Response::HTTP_OK)->withCookie($cookie);
            } else {
                return response()->json(["login" => false], Response::HTTP_OK);
            }
        }
    }

    public function logout()
    {
        $cookie = Cookie::forget('cookie_token');
        return response(true, Response::HTTP_OK)->withCookie($cookie);
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'password' => 'confirmed',
        ]);

        $user = user::find(auth()->user()->id);
        if ($request->email) {
            $user->email = $request->email;
        }
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        if ($user->save()) {
            return response()->json(true, Response::HTTP_CREATED);
        }
    }

    public function userProfile()
    {
        return response()->json([
            "userData" => auth()->user()
        ], Response::HTTP_OK);
    }
}
