<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the profile page.
     * Loads the user's profile, educations, skills, and projects.
     */
    public function edit()
    {
        // Get the first user for testing
        $user = User::first();

        // Load profile with related data
        $profile = $user->profile()
            ->with('educations', 'skills', 'projects')
            ->first();

        // Send data to the Profile page
        return Inertia::render('Profile', [
            'user' => $user,
            'profile' => $profile,
            'educations' => $profile?->educations ?? [],
            'skills' => $profile?->skills ?? [],
            'projects' => $profile?->projects ?? [],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        // Validate submitted profile data
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],

            'phone' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],

            'bio' => ['nullable', 'string', 'max:1000'],

            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'github_url' => ['nullable', 'string', 'max:255'],
            'website_url' => ['nullable', 'string', 'max:255'],
        ]);

        // Get the current user
        $user = User::first();

        // Update user account information
        $user->update([
            'name' => $validated['full_name'],
            'email' => $validated['email'],
        ]);

        // Create or update the profile record
        Profile::updateOrCreate(
            [
                'user_id' => $user->id,
            ],
            [
                'phone' => $validated['phone'],
                'location' => $validated['location'],
                'bio' => $validated['bio'],
                'linkedin_url' => $validated['linkedin_url'],
                'github_url' => $validated['github_url'],
                'website_url' => $validated['website_url'],
            ]
        );

        // Return back with success message
        return back()->with('success', 'Profile updated successfully!');
    }
}