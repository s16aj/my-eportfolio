<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Show all projects for one profile
    public function index(Request $request)
    {
        $projects = Project::where('profile_id', $request->profile_id)->get();

        return response()->json([
            'projects' => $projects,
        ]);
    }

    // Add a new project
    public function store(Request $request)
    {
        $validated = $request->validate([
            'profile_id' => 'required|exists:profiles,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_url' => 'nullable|url',
        ]);

        $project = Project::create($validated);

        return response()->json([
            'message' => 'Project added successfully',
            'project' => $project,
        ], 201);
    }

    // Show one project
    public function show(string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'message' => 'Project not found',
            ], 404);
        }

        return response()->json([
            'project' => $project,
        ]);
    }

    // Update a project
    public function update(Request $request, string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'message' => 'Project not found',
            ], 404);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'project_url' => 'nullable|url',
        ]);

        $project->update($validated);

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => $project,
        ]);
    }

    // Delete a project
    public function destroy(string $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'message' => 'Project not found',
            ], 404);
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }
}