<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    // Show all skills for one profile
    public function index(Request $request)
    {
        $skills = Skill::where('profile_id', $request->profile_id)->get();

        return response()->json([
            'skills' => $skills,
        ]);
    }

    // Add a new skill
    public function store(Request $request)
    {
        $validated = $request->validate([
            'profile_id' => 'required|exists:profiles,id',
            'skill_name' => 'required|string|max:255',
            'skill_level' => 'nullable|string|max:255',
        ]);

        $skill = Skill::create($validated);

        return response()->json([
            'message' => 'Skill added successfully',
            'skill' => $skill,
        ], 201);
    }

    // Show one skill
    public function show(string $id)
    {
        $skill = Skill::find($id);

        if (!$skill) {
            return response()->json([
                'message' => 'Skill not found',
            ], 404);
        }

        return response()->json([
            'skill' => $skill,
        ]);
    }

    // Update a skill
    public function update(Request $request, string $id)
    {
        $skill = Skill::find($id);

        if (!$skill) {
            return response()->json([
                'message' => 'Skill not found',
            ], 404);
        }

        $validated = $request->validate([
            'skill_name' => 'sometimes|string|max:255',
            'skill_level' => 'nullable|string|max:255',
        ]);

        $skill->update($validated);

        return response()->json([
            'message' => 'Skill updated successfully',
            'skill' => $skill,
        ]);
    }

    // Delete a skill
    public function destroy(string $id)
    {
        $skill = Skill::find($id);

        if (!$skill) {
            return response()->json([
                'message' => 'Skill not found',
            ], 404);
        }

        $skill->delete();

        return response()->json([
            'message' => 'Skill deleted successfully',
        ]);
    }
}