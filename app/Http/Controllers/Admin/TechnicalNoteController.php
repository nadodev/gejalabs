<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TechnicalNote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class TechnicalNoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/TechnicalNotes/Index', [
            'notes' => TechnicalNote::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        TechnicalNote::create($this->payload($request));

        return back()->with('success', 'Anotação criada.');
    }

    public function update(Request $request, TechnicalNote $technicalNote): RedirectResponse
    {
        $technicalNote->update($this->payload($request, $technicalNote));

        return back()->with('success', 'Anotação atualizada.');
    }

    public function destroy(TechnicalNote $technicalNote): RedirectResponse
    {
        $technicalNote->delete();

        return back()->with('success', 'Anotação removida.');
    }

    private function payload(Request $request, ?TechnicalNote $note = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'tags' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ]);

        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['tags'] = collect(explode(',', $data['tags'] ?? ''))->map(fn ($tag) => trim($tag))->filter()->values()->all();
        $data['is_published'] = $request->boolean('is_published');
        $data['published_at'] = $data['is_published'] ? now() : null;

        return $data;
    }
}
