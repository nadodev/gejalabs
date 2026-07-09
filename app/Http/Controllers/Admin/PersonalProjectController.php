<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PersonalProject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PersonalProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/PersonalProjects/Index', [
            'projects' => PersonalProject::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        PersonalProject::create($this->payload($request));

        return back()->with('success', 'Projeto pessoal criado.');
    }

    public function update(Request $request, PersonalProject $personalProject): RedirectResponse
    {
        $personalProject->update($this->payload($request, $personalProject));

        return back()->with('success', 'Projeto pessoal atualizado.');
    }

    public function destroy(PersonalProject $personalProject): RedirectResponse
    {
        $personalProject->delete();

        return back()->with('success', 'Projeto pessoal removido.');
    }

    private function payload(Request $request, ?PersonalProject $project = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:running,stable,planned,failed'],
            'progress' => ['required', 'integer', 'min:0', 'max:100'],
            'summary' => ['required', 'string'],
            'tech' => ['nullable', 'string'],
            'overview' => ['nullable', 'string'],
            'architecture' => ['nullable', 'string'],
            'decisions' => ['nullable', 'string'],
            'challenges' => ['nullable', 'string'],
            'lessons' => ['nullable', 'string'],
            'repo_url' => ['nullable', 'url'],
            'live_url' => ['nullable', 'url'],
            'is_published' => ['boolean'],
        ]);

        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        if ($project && $project->slug !== $data['slug']) {
            $data['slug'] = $this->uniqueSlug($data['slug'], $project->id);
        } elseif (! $project) {
            $data['slug'] = $this->uniqueSlug($data['slug']);
        }

        foreach (['tech', 'decisions', 'challenges', 'lessons'] as $field) {
            $data[$field] = $this->lines($data[$field] ?? '');
        }

        $data['is_published'] = $request->boolean('is_published');

        return $data;
    }

    private function lines(string $value): array
    {
        return collect(preg_split('/\r\n|\r|\n/', $value))
            ->map(fn (string $line) => trim($line))
            ->filter()
            ->values()
            ->all();
    }

    private function uniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $base = $slug;
        $count = 2;

        while (PersonalProject::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$base}-{$count}";
            $count++;
        }

        return $slug;
    }
}
