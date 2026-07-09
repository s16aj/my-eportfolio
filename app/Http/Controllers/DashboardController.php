<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the student dashboard.
     * Loads the user's profile data and summary statistics.
     */
    public function index()
    {
        // Get the authenticated user
        $user = auth()->user();

        // Redirect admin users to the admin dashboard
        if ($user->role === 'admin') {
            return redirect('/admin');
        }

        // Load profile with related education, skills, and projects
        $profile = $user->profile()
            ->with(['educations', 'skills', 'projects'])
            ->first();

        // Load the user's portfolio with engagement statistics
        $portfolio = $user->portfolios()
            ->with('engagementStatistic')
            ->first();

        // Send data to the Dashboard page
       return Inertia::render('Dashboard', [
        'user' => $user,
        'profile' => $profile,
        'portfolio' => $portfolio,

        'stats' => [
            'educations' => $profile?->educations->count() ?? 0,
            'skills' => $profile?->skills->count() ?? 0,
            'projects' => $profile?->projects->count() ?? 0,
        ],

        'analytics' => [
            'total_views' => $portfolio?->engagementStatistic?->total_views ?? 0,
            'most_viewed_section' => $portfolio?->engagementStatistic?->most_viewed_section ?? 'N/A',
            'last_viewed_at' => $portfolio?->engagementStatistic?->last_viewed_at,
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