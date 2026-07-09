<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WorkExperience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WorkExperienceController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        WorkExperience::create($this->payload($request));
        return back()->with('success', 'Experiência cadastrada.');
    }

    public function update(Request $request, WorkExperience $workExperience): RedirectResponse
    {
        $workExperience->update($this->payload($request));
        return back()->with('success', 'Experiência atualizada.');
    }

    public function destroy(WorkExperience $workExperience): RedirectResponse
    {
        $workExperience->delete();
        return back()->with('success', 'Experiência removida.');
    }

    private function payload(Request $request): array
    {
        $data = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'tags' => ['nullable', 'string'],
            'started_at' => ['required', 'date'],
            'ended_at' => ['nullable', 'date', 'after_or_equal:started_at'],
            'is_current' => ['boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $data['is_current'] = $request->boolean('is_current');
        if ($data['is_current']) {
            $data['ended_at'] = null;
        }
        $data['tags'] = collect(preg_split('/,|\r\n|\r|\n/', $data['tags'] ?? ''))
            ->map(fn ($tag) => trim($tag))
            ->filter()
            ->values()
            ->all();
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $data;
    }
}
