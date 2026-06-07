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
}