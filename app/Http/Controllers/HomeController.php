<?php

namespace App\Http\Controllers;

use App\Models\PersonalProject;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    const LATEST_PROJECTS_COUNT = 2;
    public function index(): Response
    {
        $publishedProjects = PersonalProject::query()
            ->where('is_published', true)
            ->latest()
            ->get();

        $latestProjects = $publishedProjects->take(self::LATEST_PROJECTS_COUNT);

        return Inertia::render('Home', [
            'latestProjects' => $latestProjects,
            'terminalProjects' => $publishedProjects->values(),
        ]);
    }
}
