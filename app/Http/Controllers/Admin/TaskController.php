<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => Task::latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Task::create($this->payload($request));
        return back()->with('success', 'Tarefa criada.');
    }

    public function update(Request $request, Task $task): RedirectResponse
    {
        $task->update($this->payload($request));
        return back()->with('success', 'Tarefa atualizada.');
    }

    public function destroy(Task $task): RedirectResponse
    {
        $task->delete();
        return back()->with('success', 'Tarefa removida.');
    }

    private function payload(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'in:todo,doing,done,blocked'],
            'priority' => ['required', 'in:low,medium,high'],
            'due_date' => ['nullable', 'date'],
            'tags' => ['nullable', 'string'],
        ]);

        $data['tags'] = collect(preg_split('/,|\r\n|\r|\n/', $data['tags'] ?? ''))
            ->map(fn ($tag) => trim($tag))
            ->filter()
            ->values()
            ->all();

        return $data;
    }
}
