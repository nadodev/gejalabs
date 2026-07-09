<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KnowledgeItemController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Knowledge/Index', [
            'items' => KnowledgeItem::orderBy('sort_order')->orderBy('year')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        KnowledgeItem::create($this->payload($request));
        return back()->with('success', 'Item de knowledge criado.');
    }

    public function update(Request $request, KnowledgeItem $knowledgeItem): RedirectResponse
    {
        $knowledgeItem->update($this->payload($request));
        return back()->with('success', 'Item de knowledge atualizado.');
    }

    public function destroy(KnowledgeItem $knowledgeItem): RedirectResponse
    {
        $knowledgeItem->delete();
        return back()->with('success', 'Item removido.');
    }

    private function payload(Request $request): array
    {
        $data = $request->validate([
            'type' => ['required', 'in:timeline,node'],
            'label' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'string', 'max:20'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'accent' => ['required', 'in:primary,info,warning'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'is_published' => ['boolean'],
        ]);

        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['is_published'] = $request->boolean('is_published');

        return $data;
    }
}
