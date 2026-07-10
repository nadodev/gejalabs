<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutGalleryPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutGalleryPhotoController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        AboutGalleryPhoto::create($this->payload($request));

        return back()->with('success', 'Foto cadastrada.');
    }

    public function update(Request $request, AboutGalleryPhoto $aboutGalleryPhoto): RedirectResponse
    {
        $aboutGalleryPhoto->update($this->payload($request, $aboutGalleryPhoto));

        return back()->with('success', 'Foto atualizada.');
    }

    public function destroy(AboutGalleryPhoto $aboutGalleryPhoto): RedirectResponse
    {
        Storage::disk('public')->delete($aboutGalleryPhoto->image_path);
        $aboutGalleryPhoto->delete();

        return back()->with('success', 'Foto removida.');
    }

    private function payload(Request $request, ?AboutGalleryPhoto $photo = null): array
    {
        $data = $request->validate([
            'image' => [$photo ? 'nullable' : 'required', 'image', 'max:4096'],
            'caption' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_published'] = $request->boolean('is_published');
        unset($data['image']);

        if ($request->hasFile('image')) {
            if ($photo?->image_path) {
                Storage::disk('public')->delete($photo->image_path);
            }

            $data['image_path'] = $request->file('image')->store('about-gallery', 'public');
        }

        return $data;
    }
}
