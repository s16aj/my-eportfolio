<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display the profile page.
     * Loads the user's profile, educations, skills, and projects.
     */
    public function edit()
    {
        $user = auth()->user();

        $profile = $user->profile()
            ->with('educations', 'skills', 'projects')
            ->first();

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
        $validated = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],

            'phone' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'bio' => ['nullable', 'string', 'max:1000'],

            'linkedin_url' => ['nullable', 'string', 'max:255'],
            'github_url' => ['nullable', 'string', 'max:255'],
            'website_url' => ['nullable', 'string', 'max:255'],

            'profile_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $user = auth()->user();

        $user->update([
            'name' => $validated['full_name'],
            'email' => $validated['email'],
        ]);

        $profile = Profile::firstOrCreate([
            'user_id' => $user->id,
        ]);

        $profileImagePath = $profile->profile_image;

        if ($request->hasFile('profile_image')) {
            if ($profile->profile_image) {
                Storage::disk('public')->delete($profile->profile_image);
            }

            $profileImagePath = $request->file('profile_image')->store('profile-images', 'public');
        }

        $profile->update([
            'phone' => $validated['phone'],
            'location' => $validated['location'],
            'bio' => $validated['bio'],
            'linkedin_url' => $validated['linkedin_url'],
            'github_url' => $validated['github_url'],
            'website_url' => $validated['website_url'],
            'profile_image' => $profileImagePath,
        ]);

        return back()->with('success', 'Profile updated successfully!');
    }
}