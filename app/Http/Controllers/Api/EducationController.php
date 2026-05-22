<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;

class EducationController extends Controller
{
    // Show all education records for one profile
    public function index(Request $request)
    {
        $educations = Education::where('profile_id', $request->profile_id)->get();

        return response()->json([
            'educations' => $educations,
        ]);
    }

    // Create a new education record
    public function store(Request $request)
    {
        $validated = $request->validate([
            'profile_id' => 'required|exists:profiles,id',
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'field_of_study' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $education = Education::create($validated);

        return response()->json([
            'message' => 'Education added successfully',
            'education' => $education,
        ], 201);
    }

    // Show one education record
    public function show(string $id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json([
                'message' => 'Education not found',
            ], 404);
        }

        return response()->json([
            'education' => $education,
        ]);
    }

    // Update an education record
    public function update(Request $request, string $id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json([
                'message' => 'Education not found',
            ], 404);
        }

        $validated = $request->validate([
            'institution' => 'sometimes|string|max:255',
            'degree' => 'sometimes|string|max:255',
            'field_of_study' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        $education->update($validated);

        return response()->json([
            'message' => 'Education updated successfully',
            'education' => $education,
        ]);
    }

    // Delete an education record
    public function destroy(string $id)
    {
        $education = Education::find($id);

        if (!$education) {
            return response()->json([
                'message' => 'Education not found',
            ], 404);
        }

        $education->delete();

        return response()->json([
            'message' => 'Education deleted successfully',
        ]);
    }
}