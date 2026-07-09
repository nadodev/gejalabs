import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, arrayToText, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { Task } from "@/types/admin";

interface Props {
  tasks: Task[];
}

const empty = {
  title: "",
  description: "",
  status: "todo" as "todo" | "doing" | "done" | "blocked",
  priority: "medium" as "low" | "medium" | "high",
  due_date: "",
  tags: "",
};

export default function TasksIndex({ tasks }: Props) {
  const [editing, setEditing] = useState<Task | null>(null);
  const form = useForm(empty);

  function edit(task: Task) {
    setEditing(task);
    form.setData({
      title: task.title,
      description: task.description ?? "",
      status: task.status,
      priority: task.priority,
      due_date: task.due_date?.slice(0, 10) ?? "",
      tags: arrayToText(task.tags),
    });
  }

  function reset() {
    setEditing(null);
    form.setData(empty);
    form.clearErrors();
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editing) {
      form.put(`/admin/tasks/${editing.id}`, { onSuccess: reset });
    } else {
      form.post("/admin/tasks", { onSuccess: reset });
    }
  }

  return (
    <AdminLayout title="Tasks" eyebrow="// internal only">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="panel p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="mono-label">form</span>
              <h2 className="mt-1 font-display text-2xl font-600">{editing ? "Edit task" : "New task"}</h2>
            </div>
            {editing ? (
              <button type="button" onClick={reset} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
                cancel
              </button>
            ) : null}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Title" error={form.errors.title}>
              <input className={inputClass} value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} />
            </Field>
            <Field label="Description" error={form.errors.description}>
              <textarea className={textareaClass} value={form.data.description} onChange={(e) => form.setData("description", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Status" error={form.errors.status}>
                <select className={inputClass} value={form.data.status} onChange={(e) => form.setData("status", e.target.value as "todo" | "doing" | "done" | "blocked")}>
                  <option value="todo">todo</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                  <option value="blocked">blocked</option>
                </select>
              </Field>
              <Field label="Priority" error={form.errors.priority}>
                <select className={inputClass} value={form.data.priority} onChange={(e) => form.setData("priority", e.target.value as "low" | "medium" | "high")}>
                  <option value="low">low</option>
                  <option value="medium">medium</option>
                  <option value="high">high</option>
                </select>
              </Field>
            </div>
            <Field label="Due date" error={form.errors.due_date}>
              <input className={inputClass} type="date" value={form.data.due_date} onChange={(e) => form.setData("due_date", e.target.value)} />
            </Field>
            <Field label="Tags (one per line)" error={form.errors.tags}>
              <textarea className={textareaClass} value={form.data.tags} onChange={(e) => form.setData("tags", e.target.value)} />
            </Field>
            <button disabled={form.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editing ? "save task" : "create task"}
            </button>
          </form>
        </section>

        <section className="panel p-5">
          <span className="mono-label">records</span>
          <h2 className="mt-1 font-display text-2xl font-600">Internal board</h2>
          <div className="mt-5 grid gap-3">
            {tasks.length ? (
              tasks.map((task) => (
                <div key={task.id} className="border border-border bg-surface/30 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-lg font-600">{task.title}</div>
                      <div className="mt-1 font-mono text-xs text-primary">{task.status} / {task.priority}</div>
                    </div>
                    {task.due_date ? <div className="font-mono text-xs text-muted-foreground">due {task.due_date.slice(0, 10)}</div> : null}
                  </div>
                  {task.description ? <p className="mt-3 text-sm text-muted-foreground">{task.description}</p> : null}
                  {task.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {task.tags.map((tag) => <span key={tag} className="border border-border px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">{tag}</span>)}
                    </div>
                  ) : null}
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => edit(task)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                      edit
                    </button>
                    <button type="button" onClick={() => router.delete(`/admin/tasks/${task.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tasks registered yet.</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
