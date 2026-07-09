<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function preview()
    {
        $user = auth()->user();

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
        $user = auth()->user();

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

    public function unpublish()
    {
        $user = auth()->user();

        $portfolio = Portfolio::where('user_id', $user->id)->first();

        if (!$portfolio) {
            return back()->with('error', 'No portfolio found to unpublish.');
        }

        $portfolio->update([
            'is_published' => false,
        ]);

        return back()->with('success', 'Portfolio unpublished. It is no longer visible to the public.');
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

        $statistic = $portfolio->engagementStatistic()->firstOrCreate(
            [
                'portfolio_id' => $portfolio->id,
            ],
            [
                'total_views' => 0,
                'most_viewed_section' => 'portfolio',
                'last_viewed_at' => now(),
            ]
        );

        $statistic->increment('total_views');

        $statistic->update([
            'last_viewed_at' => now(),
        ]);

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