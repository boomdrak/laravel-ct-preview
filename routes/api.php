<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;

## API endpoints that are secured by bearer token
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserAuthController::class, 'logout']);
    Route::get('me', [UserAuthController::class, 'me'])->middleware('auth:sanctum');
    Route::get('/', [UserAuthController::class, 'me'])->middleware('auth:sanctum');
    Route::post('logout',[UserAuthController::class,'logout']);
});

## API endpoint with that are wide open
Route::post('register',[UserAuthController::class,'register']);
Route::post('login',[UserAuthController::class,'login']);