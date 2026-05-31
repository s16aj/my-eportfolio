<?php

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');


Route::get('/profile', function () {
    $user = \App\Models\User::first();

    $profile = $user->profile;

    return Inertia::render('Profile', [
        'user' => $user,
        'profile' => $profile,
    ]);
})->name('profile');

Route::post('/profile', function (Request $request) {
    $validated = $request->validate([
        'full_name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'max:255'],
        'university' => ['nullable', 'string', 'max:255'],
        'major' => ['nullable', 'string', 'max:255'],
        'bio' => ['nullable', 'string', 'max:1000'],
        'skills' => ['nullable', 'string', 'max:500'],
    ]);

    $user = \App\Models\User::first();

    $user->update([
        'name' => $validated['full_name'],
        'email' => $validated['email'],
    ]);

    Profile::updateOrCreate(
        [
            'user_id' => $user->id,
        ],
        [
            'bio' => $validated['bio'],
            'university' => $validated['university'],
            'major' => $validated['major'],
        ]
    );

    return back()->with('success', 'Profile updated successfully!');
})->name('profile.store');

Route::get('/templates', function () {
    return Inertia::render('Templates');
})->name('templates');

Route::get('/portfolio', function () {
    return Inertia::render('Portfolio');
})->name('portfolio');