<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Portfolio;
use App\Models\Template;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Show admin dashboard statistics
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => User::count(),
            'totalPortfolios' => Portfolio::count(),
            'totalTemplates' => Template::count(),
            'publishedPortfolios' => Portfolio::where('is_published', true)->count(),
        ]);
    }

    // Show all users
    public function users()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all(),
        ]);
    }

    // Show all templates
    public function templates()
    {
        return Inertia::render('Admin/Templates', [
            'templates' => Template::all(),
        ]);
    }
    // Add a new template
    public function storeTemplate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
        ]);

        Template::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return back();
    }

    // Delete a template and move affected portfolios to the default template
    public function deleteTemplate(Template $template)
    {
        $defaultTemplate = Template::where('name', 'Default Template')->first();

        if (! $defaultTemplate) {
            $defaultTemplate = Template::create([
                'name' => 'Default Template',
                'description' => 'Default portfolio template used when another template is removed.',
                'is_active' => true,
            ]);
        }

        if ($template->id === $defaultTemplate->id) {
            return back()->withErrors([
                'template' => 'The default template cannot be deleted.',
            ]);
        }

        Portfolio::where('template_id', $template->id)->update([
            'template_id' => $defaultTemplate->id,
        ]);

        $template->delete();

        return back()->with('success', 'Template deleted successfully. Affected portfolios were moved to the default template.');
    }
}