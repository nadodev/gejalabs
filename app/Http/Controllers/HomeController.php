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
        $latestProjects = PersonalProject::query()
            ->where('is_published', true)
            ->latest()
            ->take(self::LATEST_PROJECTS_COUNT)
            ->get();

        return Inertia::render('Home', [
            'latestProjects' => $latestProjects,
        ]);
    }
}
