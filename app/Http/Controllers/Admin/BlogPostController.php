<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class BlogPostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Blog/Index', [
            'posts' => BlogPost::latest('published_at')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        BlogPost::create($this->payload($request));

        return back()->with('success', 'Artigo criado.');
    }

    public function update(Request $request, BlogPost $blogPost): RedirectResponse
    {
        $blogPost->update($this->payload($request, $blogPost));

        return back()->with('success', 'Artigo atualizado.');
    }

    public function destroy(BlogPost $blogPost): RedirectResponse
    {
        if ($blogPost->cover_path) {
            Storage::disk('public')->delete($blogPost->cover_path);
        }

        $blogPost->delete();

        return back()->with('success', 'Artigo removido.');
    }

    private function payload(Request $request, ?BlogPost $post = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'cover' => ['nullable', 'image', 'max:4096'],
            'description' => ['required', 'string'],
            'content' => ['required', 'string'],
            'tags' => ['nullable', 'string'],
            'published_at' => ['nullable', 'date'],
            'is_published' => ['boolean'],
        ]);

        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['slug'] = $this->uniqueSlug($data['slug'], $post?->id);
        $data['tags'] = collect(explode(',', $data['tags'] ?? ''))
            ->map(fn (string $tag) => trim($tag))
            ->filter()
            ->values()
            ->all();
        $data['is_published'] = $request->boolean('is_published');

        if ($data['is_published'] && empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        if (! $data['is_published']) {
            $data['published_at'] = null;
        }

        unset($data['cover']);

        if ($request->hasFile('cover')) {
            if ($post?->cover_path) {
                Storage::disk('public')->delete($post->cover_path);
            }

            $data['cover_path'] = $request->file('cover')->store('blog-covers', 'public');
        }

        return $data;
    }

    private function uniqueSlug(string $slug, ?int $ignoreId = null): string
    {
        $base = $slug;
        $count = 2;

        while (BlogPost::where('slug', $slug)->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$base}-{$count}";
            $count++;
        }

        return $slug;
    }
}
