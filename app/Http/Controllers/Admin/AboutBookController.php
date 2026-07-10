<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutBook;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutBookController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        AboutBook::create($this->payload($request));

        return back()->with('success', 'Livro cadastrado.');
    }

    public function update(Request $request, AboutBook $aboutBook): RedirectResponse
    {
        $aboutBook->update($this->payload($request, $aboutBook));

        return back()->with('success', 'Livro atualizado.');
    }

    public function destroy(AboutBook $aboutBook): RedirectResponse
    {
        if ($aboutBook->image_path) {
            Storage::disk('public')->delete($aboutBook->image_path);
        }

        $aboutBook->delete();

        return back()->with('success', 'Livro removido.');
    }

    private function payload(Request $request, ?AboutBook $book = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'image' => ['nullable', 'image', 'max:4096'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_published'] = $request->boolean('is_published');
        unset($data['image']);

        if ($request->hasFile('image')) {
            if ($book?->image_path) {
                Storage::disk('public')->delete($book->image_path);
            }

            $data['image_path'] = $request->file('image')->store('about-books', 'public');
        }

        return $data;
    }
}
