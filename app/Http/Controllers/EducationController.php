<?php

namespace App\Http\Controllers;

use App\Models\Education;
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
            'field_of_study' => ['required', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);

        $user = auth()->user();

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
        abort_unless($education->profile->user_id === auth()->id(), 403);

        // Remove the selected education
        $education->delete();

        // Return back with success message
        return back()->with('success', 'Education deleted successfully!');
    }
}
