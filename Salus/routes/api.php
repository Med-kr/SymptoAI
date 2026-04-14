<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\SymptomController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AiAdviceController;
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/me', [MeController::class, 'me']);
Route::middleware('auth:sanctum')->post('/logout', [LogoutController::class, 'logout']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/symptoms', [SymptomController::class, 'index']);
    Route::post('/symptoms', [SymptomController::class, 'store']);
    Route::get('/symptoms/{id}', [SymptomController::class, 'show']);
    Route::put('/symptoms/{id}', [SymptomController::class, 'update']);
    Route::delete('/symptoms/{id}', [SymptomController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/doctors', [DoctorController::class, 'index']);
    Route::get('/doctors/{id}', [DoctorController::class, 'show']);
    Route::get('/search', [DoctorController::class, 'search']);

});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/appointments', [AppointmentController::class, 'index']);
    Route::post('/appointments', [AppointmentController::class, 'store']);
    Route::get('/appointments/{id}', [AppointmentController::class, 'show']);
    Route::put('/appointments/{id}', [AppointmentController::class, 'update']);
    Route::delete('/appointments/{id}', [AppointmentController::class, 'destroy']);
});

Route::middleware('auth:sanctum')->group(function (){
    Route::post('/health-advice', [AiAdviceController::class, 'index']);
});

