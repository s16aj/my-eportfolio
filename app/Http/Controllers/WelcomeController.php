<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    // Show the public welcome/landing page, or redirect signed-in users to their dashboard
    public function index()
    {
        if (Auth::check()) {
            return redirect('/dashboard');
        }

        return Inertia::render('Welcome');
    }
}
