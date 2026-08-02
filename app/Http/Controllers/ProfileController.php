<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

            'new_educations' => ['nullable', 'array'],
            'new_educations.*.institution' => ['required', 'string', 'max:255'],
            'new_educations.*.degree' => ['required', 'string', 'max:255'],
            'new_educations.*.field_of_study' => ['required', 'string', 'max:255'],
            'new_educations.*.start_date' => ['required', 'date'],
            'new_educations.*.end_date' => ['nullable', 'date'],
            'deleted_education_ids' => ['nullable', 'array'],
            'deleted_education_ids.*' => ['integer'],

            'new_skills' => ['nullable', 'array'],
            'new_skills.*.skill_name' => ['required', 'string', 'max:255'],
            'new_skills.*.skill_level' => ['nullable', 'string', 'max:255'],
            'new_skills.*.skill_percentage' => ['nullable', 'integer'],
            'deleted_skill_ids' => ['nullable', 'array'],
            'deleted_skill_ids.*' => ['integer'],

            'new_projects' => ['nullable', 'array'],
            'new_projects.*.title' => ['required', 'string', 'max:255'],
            'new_projects.*.description' => ['nullable', 'string', 'max:1000'],
            'new_projects.*.project_url' => ['nullable', 'string', 'max:255'],
            'deleted_project_ids' => ['nullable', 'array'],
            'deleted_project_ids.*' => ['integer'],
        ]);

        $user = auth()->user();

        DB::transaction(function () use ($request, $validated, $user) {
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
                    Storage::disk('s3')->delete($profile->profile_image);
                }

                $profileImagePath = $request->file('profile_image')->store('profile-images', 's3');
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

            // Education: apply queued deletions first, then queued additions.
            if (! empty($validated['deleted_education_ids'])) {
                $profile->educations()->whereIn('id', $validated['deleted_education_ids'])->delete();
            }

            foreach ($validated['new_educations'] ?? [] as $education) {
                $profile->educations()->create($education);
            }

            // Skills: apply queued deletions first, then queued additions.
            if (! empty($validated['deleted_skill_ids'])) {
                $profile->skills()->whereIn('id', $validated['deleted_skill_ids'])->delete();
            }

            foreach ($validated['new_skills'] ?? [] as $skill) {
                $profile->skills()->create($skill);
            }

            // Projects: apply queued deletions first, then queued additions.
            if (! empty($validated['deleted_project_ids'])) {
                $profile->projects()->whereIn('id', $validated['deleted_project_ids'])->delete();
            }

            foreach ($validated['new_projects'] ?? [] as $project) {
                $profile->projects()->create($project);
            }
        });

        return back()->with('success', 'Profile updated successfully!');
    }
}