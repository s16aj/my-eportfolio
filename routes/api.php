<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\SkillController;
use App\Http\Controllers\Api\projectController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::apiResource('profiles', ProfileController::class);
Route::apiResource('educations', EducationController::class);
Route::apiResource('skills', SkillController::class);
Route::apiResource('projects', ProjectController::class);