<?php

namespace App\Http\Controllers;

use App\Models\PersonalProject;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $latestProjects = PersonalProject::query()
            ->where('is_published', true)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('Home', [
            'latestProjects' => $latestProjects,
        ]);
    }
}
