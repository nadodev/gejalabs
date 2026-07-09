<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutPage;
use App\Models\WorkExperience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutPageController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/About/Edit', [
            'about' => AboutPage::firstOrCreate([], [
                'intro' => 'GejaLabs is a personal software engineering laboratory: a place to run experiments in architecture, artificial intelligence, backend systems and developer experience.',
                'principles' => [],
            ]),
            'experiences' => WorkExperience::orderByDesc('is_current')->orderByDesc('started_at')->get(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $about = AboutPage::firstOrCreate([], ['intro' => '']);

        $data = $request->validate([
            'eyebrow' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'intro' => ['required', 'string'],
            'principles' => ['nullable', 'string'],
            'contact_title' => ['required', 'string', 'max:255'],
            'contact_text' => ['nullable', 'string'],
            'github_url' => ['nullable', 'url'],
            'linkedin_url' => ['nullable', 'url'],
            'resume' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:5120'],
        ]);

        $data['principles'] = collect(preg_split('/\r\n|\r|\n/', $data['principles'] ?? ''))
            ->map(fn ($line) => trim($line))
            ->filter()
            ->map(function ($line) {
                [$title, $detail] = array_pad(explode('|', $line, 2), 2, '');
                return ['title' => trim($title), 'detail' => trim($detail)];
            })
            ->values()
            ->all();

        if ($request->hasFile('resume')) {
            if ($about->resume_path) {
                Storage::disk('public')->delete($about->resume_path);
            }
            $file = $request->file('resume');
            $data['resume_path'] = $file->store('resumes', 'public');
            $data['resume_original_name'] = $file->getClientOriginalName();
        }

        unset($data['resume']);
        $about->update($data);

        return back()->with('success', 'Página Sobre atualizada.');
    }
}
