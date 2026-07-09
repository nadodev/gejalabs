<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProfessionalProject;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfessionalProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ProfessionalProjects/Index', [
            'projects' => ProfessionalProject::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        ProfessionalProject::create($this->payload($request));

        return back()->with('success', 'Projeto profissional criado.');
    }

    public function update(Request $request, ProfessionalProject $professionalProject): RedirectResponse
    {
        $professionalProject->update($this->payload($request));

        return back()->with('success', 'Projeto profissional atualizado.');
    }

    public function destroy(ProfessionalProject $professionalProject): RedirectResponse
    {
        $professionalProject->delete();

        return back()->with('success', 'Projeto profissional removido.');
    }

    private function payload(Request $request): array
    {
        $data = $request->validate([
            'company' => ['required', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string'],
            'tech' => ['nullable', 'string'],
            'modules' => ['nullable', 'string'],
            'contributions' => ['nullable', 'string'],
            'challenges' => ['nullable', 'string'],
            'lessons' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ]);

        foreach (['tech', 'modules', 'contributions', 'challenges', 'lessons'] as $field) {
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
}
