<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\User;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function preview()
    {
        $user = User::first();

        $profile = $user->profile()
            ->with(['educations', 'skills', 'projects'])
            ->first();

        $portfolio = Portfolio::with('template')
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('Portfolio', [
            'user' => $user,
            'profile' => $profile,
            'educations' => $profile?->educations ?? [],
            'skills' => $profile?->skills ?? [],
            'projects' => $profile?->projects ?? [],
            'portfolio' => $portfolio,
        ]);
    }
    public function publish()
    {
        $user = User::first();

        $portfolio = Portfolio::where('user_id', $user->id)->first();

        if (!$portfolio) {
            return back()->with('error', 'Please select a template before publishing.');
        }

        $portfolio->update([
            'is_published' => true,
            'published_at' => now(),
        ]);

        return back()->with('success', 'Portfolio published successfully!');
    }

    public function showPublic($slug)
    {
        $portfolio = Portfolio::with([
            'template',
            'user.profile.educations',
            'user.profile.skills',
            'user.profile.projects',
        ])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        $user = $portfolio->user;
        $profile = $user->profile;

        return Inertia::render('PublicPortfolio', [
            'user' => $user,
            'profile' => $profile,
            'educations' => $profile?->educations ?? [],
            'skills' => $profile?->skills ?? [],
            'projects' => $profile?->projects ?? [],
            'portfolio' => $portfolio,
        ]);
    }
}