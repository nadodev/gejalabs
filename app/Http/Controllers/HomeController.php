<?php

namespace App\Http\Controllers;

use App\Models\KnowledgeItem;
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
        $statusCounts = $publishedProjects->countBy('status');
        $experienceStartYear = 2023;

        return Inertia::render('Home', [
            'latestProjects' => $latestProjects,
            'terminalProjects' => $publishedProjects->values(),
            'metrics' => [
                'projects' => [
                    'total' => $publishedProjects->count(),
                    'stable' => $statusCounts->get('stable', 0),
                    'running' => $statusCounts->get('running', 0),
                ],
                'experience' => [
                    'years' => max(now()->year - $experienceStartYear, 0),
                    'since' => $experienceStartYear,
                ],
                'knowledge' => [
                    'nodes' => KnowledgeItem::query()
                        ->where('type', 'node')
                        ->where('is_published', true)
                        ->count(),
                    'timeline' => KnowledgeItem::query()
                        ->where('type', 'timeline')
                        ->where('is_published', true)
                        ->count(),
                ],
            ],
        ]);
    }
}
