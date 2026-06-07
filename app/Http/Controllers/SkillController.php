<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'skill_name' => ['required', 'string', 'max:255'],
            'skill_level' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::first();

        $user->profile->skills()->create($validated);

        return back()->with('success', 'Skill added successfully!');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return back()->with('success', 'Skill deleted successfully!');
    }
}