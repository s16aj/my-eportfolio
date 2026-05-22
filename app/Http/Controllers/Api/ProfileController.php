<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index()
    {
        // ignore bcuz user has only one profile
    }
    /**
     * Create a new profile.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $profile = Profile::create($validated);

        return response()->json([
            'message' => 'Profile created successfully',
            'profile' => $profile,
        ], 201);
    }

    /**
     * Show a profile by user ID.
     */
    public function show(string $id)
    {
        $profile = Profile::where('user_id', $id)->first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found',
            ], 404);
        }

        return response()->json([
            'profile' => $profile,
        ]);
    }

    /**
     * Update a profile.
     */
    public function update(Request $request, string $id)
    {
        $profile = Profile::where('user_id', $id)->first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found',
            ], 404);
        }

        $validated = $request->validate([
            'bio' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
        ]);

        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile,
        ]);
    }

    /**
     * Delete a profile.
     */
    public function destroy(string $id)
    {
        $profile = Profile::where('user_id', $id)->first();

        if (!$profile) {
            return response()->json([
                'message' => 'Profile not found',
            ], 404);
        }

        $profile->delete();

        return response()->json([
            'message' => 'Profile deleted successfully',
        ]);
    }
}