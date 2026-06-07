<?php

namespace App\Http\Controllers;

use App\Models\Education;
use App\Models\User;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    /**
     * Store a new education record.
     */
    public function store(Request $request)
    {
        // Validate the submitted education data
        $validated = $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'field_of_study' => ['nullable', 'string', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        // Get the current user
        $user = User::first();

        // Add the education record to the user's profile
        $user->profile->educations()->create($validated);

        // Return back with success message
        return back()->with('success', 'Education added successfully!');
    }

    /**
     * Delete an education record.
     */
    public function destroy(Education $education)
    {
        // Remove the selected education
        $education->delete();

        // Return back with success message
        return back()->with('success', 'Education deleted successfully!');
    }
}