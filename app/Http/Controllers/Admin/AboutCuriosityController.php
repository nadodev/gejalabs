<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutCuriosity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AboutCuriosityController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        AboutCuriosity::create($this->payload($request));

        return back()->with('success', 'Curiosidade cadastrada.');
    }

    public function update(Request $request, AboutCuriosity $aboutCuriosity): RedirectResponse
    {
        $aboutCuriosity->update($this->payload($request));

        return back()->with('success', 'Curiosidade atualizada.');
    }

    public function destroy(AboutCuriosity $aboutCuriosity): RedirectResponse
    {
        $aboutCuriosity->delete();

        return back()->with('success', 'Curiosidade removida.');
    }

    private function payload(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_published'] = $request->boolean('is_published');

        return $data;
    }
}
