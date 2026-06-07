<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the student dashboard.
     * Loads the user's profile data and summary statistics.
     */
    public function index()
    {
        // Get the first user for testing purposes
        $user = User::first();

        // Load profile with related education, skills, and projects
        $profile = $user->profile()
            ->with(['educations', 'skills', 'projects'])
            ->first();

        // Send data to the Dashboard page
        return Inertia::render('Dashboard', [
            'user' => $user,
            'profile' => $profile,
            'stats' => [
                'educations' => $profile?->educations->count() ?? 0,
                'skills' => $profile?->skills->count() ?? 0,
                'projects' => $profile?->projects->count() ?? 0,
            ],
        ]);
    }

    /**
     * Display the template selection page.
     */
    public function templates()
    {
        return Inertia::render('Templates');
    }

    /**
     * Display the portfolio preview page.
     */
    public function portfolio()
    {
        return Inertia::render('Portfolio');
    }
}