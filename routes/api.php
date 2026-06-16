<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;

// Public API authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected API routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('profiles', ProfileController::class);
    Route::apiResource('educations', EducationController::class);
    Route::apiResource('skills', SkillController::class);
    Route::apiResource('projects', ProjectController::class);
});