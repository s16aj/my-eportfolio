<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\WebAuthController;
use Illuminate\Support\Facades\Route;

// Public authentication routes
Route::get('/login', [WebAuthController::class, 'showLogin'])->name('login');
Route::post('/login', [WebAuthController::class, 'login'])->name('login.store');

Route::get('/register', [WebAuthController::class, 'showRegister'])->name('register');
Route::post('/register', [WebAuthController::class, 'register'])->name('register.store');

Route::get('/forgot-password', [PasswordResetController::class, 'showForgotPassword'])
    ->name('password.request');

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink'])
    ->name('password.email');

Route::get('/reset-password/{token}', [PasswordResetController::class, 'showResetPassword'])
    ->name('password.reset');

Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])
    ->name('password.update');

// Public portfolio page
Route::get('/portfolio/{slug}', [PortfolioController::class, 'showPublic'])
    ->name('portfolio.public');

// Protected application routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [WebAuthController::class, 'logout'])->name('logout');

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

    Route::get('/portfolio', [PortfolioController::class, 'preview'])
        ->name('portfolio');

    Route::post('/portfolio/publish', [PortfolioController::class, 'publish'])
        ->name('portfolio.publish');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard'])
        ->name('admin.dashboard');

    Route::get('/admin/users', [AdminController::class, 'users'])
        ->name('admin.users');

    Route::get('/admin/templates', [AdminController::class, 'templates'])
        ->name('admin.templates');

    Route::post('/admin/templates', [AdminController::class, 'storeTemplate'])
        ->name('admin.templates.store');

    Route::delete('/admin/templates/{template}', [AdminController::class, 'deleteTemplate'])
        ->name('admin.templates.delete');
});