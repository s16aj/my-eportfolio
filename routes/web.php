<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TemplateController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])
    ->name('dashboard');

Route::get('/profile', [ProfileController::class, 'edit'])
    ->name('profile');

Route::post('/profile', [ProfileController::class, 'update'])
    ->name('profile.update');

Route::post('/educations', [EducationController::class, 'store'])
    ->name('educations.store');

Route::delete('/educations/{education}', [EducationController::class, 'destroy'])
    ->name('educations.destroy');

Route::post('/skills', [SkillController::class, 'store'])
    ->name('skills.store');

Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])
    ->name('skills.destroy');

Route::post('/projects', [ProjectController::class, 'store'])
    ->name('projects.store');

Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])
    ->name('projects.destroy');

Route::get('/templates', [TemplateController::class, 'index'])
    ->name('templates');

Route::post('/templates/{template}/select', [TemplateController::class, 'select'])
    ->name('templates.select');

Route::get('/portfolio', [DashboardController::class, 'portfolio'])
    ->name('portfolio');