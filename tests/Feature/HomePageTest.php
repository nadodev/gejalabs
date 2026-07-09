<?php

namespace Tests\Feature;

use App\Models\PersonalProject;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as AssertableInertia;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_exposes_latest_published_projects(): void
    {
        PersonalProject::create([
            'title' => 'Older project',
            'slug' => 'older-project',
            'status' => 'stable',
            'progress' => 60,
            'summary' => 'Old project',
            'tech' => ['Laravel'],
            'overview' => 'Old overview',
            'architecture' => 'Old architecture',
            'decisions' => ['Decision'],
            'challenges' => ['Challenge'],
            'lessons' => ['Lesson'],
            'repo_url' => 'https://example.com/old',
        ])->forceFill([
            'created_at' => now()->subDays(3),
            'updated_at' => now()->subDays(3),
        ])->save();

        PersonalProject::create([
            'title' => 'Newest project',
            'slug' => 'newest-project',
            'status' => 'running',
            'progress' => 80,
            'summary' => 'Newest project',
            'tech' => ['Laravel'],
            'overview' => 'New overview',
            'architecture' => 'New architecture',
            'decisions' => ['Decision'],
            'challenges' => ['Challenge'],
            'lessons' => ['Lesson'],
            'repo_url' => 'https://example.com/new',
        ])->forceFill([
            'created_at' => now(),
            'updated_at' => now(),
        ])->save();

        PersonalProject::create([
            'title' => 'Another project',
            'slug' => 'another-project',
            'status' => 'planned',
            'progress' => 40,
            'summary' => 'Another project',
            'tech' => ['Laravel'],
            'overview' => 'Another overview',
            'architecture' => 'Another architecture',
            'decisions' => ['Decision'],
            'challenges' => ['Challenge'],
            'lessons' => ['Lesson'],
            'repo_url' => 'https://example.com/another',
        ])->forceFill([
            'created_at' => now()->subDay(),
            'updated_at' => now()->subDay(),
        ])->save();

        PersonalProject::create([
            'title' => 'Unpublished project',
            'slug' => 'unpublished-project',
            'status' => 'planned',
            'progress' => 10,
            'summary' => 'Should not appear',
            'tech' => ['Laravel'],
            'overview' => 'Hidden overview',
            'architecture' => 'Hidden architecture',
            'decisions' => ['Decision'],
            'challenges' => ['Challenge'],
            'lessons' => ['Lesson'],
            'repo_url' => 'https://example.com/private',
            'is_published' => false,
        ]);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertInertia(fn (AssertableInertia $page) => $page
            ->has('latestProjects', 3)
            ->where('latestProjects.0.title', 'Newest project')
            ->where('latestProjects.2.title', 'Older project')
        );
    }
}
