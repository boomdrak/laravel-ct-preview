<?php

use App\Http\Controllers\API\SessionController;
use App\Http\Controllers\API\TodoController;
use App\Http\Controllers\API\UserAuthController;
use Illuminate\Support\Facades\Route;

//# API endpoints that are secured by bearer token
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserAuthController::class, 'logout']);
    Route::get('me', [UserAuthController::class, 'me'])->middleware('auth:sanctum');
    Route::get('/', [UserAuthController::class, 'me'])->middleware('auth:sanctum');

    //# TODO Section
    Route::get('/todo', [TodoController::class, 'get_all'])->middleware('auth:sanctum');
    Route::put('/todo', [TodoController::class, 'update'])->middleware('auth:sanctum');
    Route::post('/todo', [TodoController::class, 'create'])->middleware('auth:sanctum');
    Route::delete('/todo', [TodoController::class, 'delete'])->middleware('auth:sanctum');
});

//# API endpoint with that are wide open
Route::get('session/check', [SessionController::class, 'check']);
Route::get('session/logout', [SessionController::class, 'logout']);

Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);
