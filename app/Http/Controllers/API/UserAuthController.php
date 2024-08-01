<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserAuthController extends Controller
{
    public function register(Request $request)
    {
        $registerUserData = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|min:8',
        ]);

        $newUser = new User;
        $newUser->email = $registerUserData['email'];
        $newUser->name = $registerUserData['name'];
        $newUser->password = Hash::make($registerUserData['password']);
        $newUser->save();

        return response()->json([
            'message' => 'User Created',
            'user' => $newUser,
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|min:8',
        ]);

        if (! Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid Credentials',
            ], 401);
        }
        $user = $request->user();

        $token_name = $request->token_name === null ? $user->name.Str::random(40) : $request->token_name;
        $tokenObj = $request->user()->createToken($token_name);

        return response()->json([
            'access_token' => $tokenObj->plainTextToken,
            'token_name' => $token_name,
            'user' => $user,
        ]);
    }
}
