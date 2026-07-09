<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AboutPageController;
use App\Http\Controllers\Admin\KnowledgeItemController;
use App\Http\Controllers\Admin\PersonalProjectController;
use App\Http\Controllers\Admin\ProfessionalProjectController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\WorkExperienceController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Models\AboutPage;
use App\Models\KnowledgeItem;
use App\Models\PersonalProject;
use App\Models\ProfessionalProject;
use App\Models\WorkExperience;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/experiments', fn () => Inertia::render('Experiments/Index', [
    'personalProjects' => PersonalProject::where('is_published', true)->latest()->get(),
    'professionalProjects' => ProfessionalProject::where('is_published', true)->latest()->get(),
]))->name('experiments.index');

Route::get('/experiments/{slug}', function (string $slug) {
    return Inertia::render('Experiments/Show', [
        'project' => PersonalProject::where('slug', $slug)->where('is_published', true)->firstOrFail(),
    ]);
})->name('experiments.show');

Route::get('/knowledge', fn () => Inertia::render('Knowledge', [
    'timeline' => KnowledgeItem::where('type', 'timeline')->where('is_published', true)->orderBy('sort_order')->get(),
    'nodes' => KnowledgeItem::where('type', 'node')->where('is_published', true)->orderBy('sort_order')->get(),
]))->name('knowledge');

Route::get('/about', fn () => Inertia::render('About', [
    'about' => AboutPage::first(),
    'experiences' => WorkExperience::orderByDesc('is_current')->orderByDesc('started_at')->get(),
]))->name('about');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/admin', DashboardController::class)->name('admin.dashboard');
    Route::resource('/admin/personal-projects', PersonalProjectController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.personal-projects');
    Route::resource('/admin/professional-projects', ProfessionalProjectController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.professional-projects');
    Route::get('/admin/about', [AboutPageController::class, 'edit'])->name('admin.about.edit');
    Route::put('/admin/about', [AboutPageController::class, 'update'])->name('admin.about.update');
    Route::resource('/admin/work-experiences', WorkExperienceController::class)
        ->only(['store', 'update', 'destroy'])
        ->names('admin.work-experiences');
    Route::resource('/admin/knowledge', KnowledgeItemController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->parameters(['knowledge' => 'knowledgeItem'])
        ->names('admin.knowledge');
    Route::resource('/admin/tasks', TaskController::class)
        ->only(['index', 'store', 'update', 'destroy'])
        ->names('admin.tasks');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});
