<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'project_url' => ['nullable', 'string', 'max:255'],
        ]);

        // Manual review: this controller is also exposed via API resource routes; ensure auth middleware where required.
        $user = auth()->user();

        $user->profile->projects()->create($validated);

        return back()->with('success', 'Project added successfully!');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return back()->with('success', 'Project deleted successfully!');
    }
}