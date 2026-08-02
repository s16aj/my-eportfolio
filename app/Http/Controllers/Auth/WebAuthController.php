<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WebAuthController extends Controller
{
    // Show login page
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    // Login user using email and password
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($credentials)) {
            return back()->withErrors([
                'email' => 'Invalid email or password.',
            ]);
        }

        $request->session()->regenerate();

        if (auth()->user()->role === 'admin') {
            return redirect('/admin');
        }

        return redirect('/dashboard');
    }

    // Show register page
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    // Create new student account
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'min:6'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'role' => 'student',
        ]);

        $user->profile()->create();

        Auth::login($user);

        return redirect('/dashboard');
    }

    // Logout current user
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}