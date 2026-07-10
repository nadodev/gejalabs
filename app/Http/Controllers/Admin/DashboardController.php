<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use App\Models\BlogPost;
use App\Models\KnowledgeItem;
use App\Models\PersonalProject;
use App\Models\ProfessionalProject;
use App\Models\Task;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'personalProjects' => PersonalProject::count(),
                'professionalProjects' => ProfessionalProject::count(),
                'knowledgeItems' => KnowledgeItem::count(),
                'blogPosts' => BlogPost::count(),
                'tasks' => Task::count(),
                'openTasks' => Task::whereIn('status', ['todo', 'doing', 'blocked'])->count(),
                'aboutConfigured' => AboutPage::query()->exists(),
            ],
            'recentTasks' => Task::latest()->limit(5)->get(),
        ]);
    }
}
