<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $templates = Template::where('is_active', true)->get();

        $portfolio = Portfolio::with('template')
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('Templates', [
            'templates' => $templates,
            'portfolio' => $portfolio,
        ]);
    }

    public function select(Request $request, Template $template)
    {
        $user = auth()->user();

        Portfolio::updateOrCreate(
        ['user_id' => $user->id],
        [
            'template_id' => $template->id,
            'slug' => strtolower(str_replace(' ', '-', $user->name)) . '-' . $user->id,
            'is_published' => false,
        ]
);

        return back()->with('success', 'Template selected successfully!');
    }
}