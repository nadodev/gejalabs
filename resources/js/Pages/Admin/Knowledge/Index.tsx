import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { KnowledgeItem } from "@/types/admin";

interface Props {
  items: KnowledgeItem[];
}

const empty = {
  type: "node" as "node" | "timeline",
  label: "",
  year: "",
  title: "",
  description: "",
  accent: "primary" as "primary" | "info" | "warning",
  sort_order: 0,
  is_published: true,
};

export default function KnowledgeIndex({ items }: Props) {
  const [editing, setEditing] = useState<KnowledgeItem | null>(null);
  const form = useForm(empty);

  function edit(item: KnowledgeItem) {
    setEditing(item);
    form.setData({
      type: item.type,
      label: item.label ?? "",
      year: item.year ?? "",
      title: item.title,
      description: item.description,
      accent: item.accent,
      sort_order: item.sort_order,
      is_published: item.is_published,
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
      form.put(`/admin/knowledge/${editing.id}`, { onSuccess: reset });
    } else {
      form.post("/admin/knowledge", { onSuccess: reset });
    }
  }

  const nodes = items.filter((item) => item.type === "node");
  const timeline = items.filter((item) => item.type === "timeline");

  return (
    <AdminLayout title="Knowledge" eyebrow="// graph and timeline">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="panel p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="mono-label">form</span>
              <h2 className="mt-1 font-display text-2xl font-600">{editing ? "Edit item" : "New item"}</h2>
            </div>
            {editing ? (
              <button type="button" onClick={reset} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
                cancel
              </button>
            ) : null}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Type" error={form.errors.type}>
                <select className={inputClass} value={form.data.type} onChange={(e) => form.setData("type", e.target.value as "node" | "timeline")}>
                  <option value="node">graph node</option>
                  <option value="timeline">timeline</option>
                </select>
              </Field>
              <Field label="Accent" error={form.errors.accent}>
                <select className={inputClass} value={form.data.accent} onChange={(e) => form.setData("accent", e.target.value as "primary" | "info" | "warning")}>
                  <option value="primary">primary</option>
                  <option value="info">info</option>
                  <option value="warning">warning</option>
                </select>
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Label" error={form.errors.label}>
                <input className={inputClass} value={form.data.label} onChange={(e) => form.setData("label", e.target.value)} placeholder="Short graph label" />
              </Field>
              <Field label="Year" error={form.errors.year}>
                <input className={inputClass} value={form.data.year} onChange={(e) => form.setData("year", e.target.value)} placeholder="2026" />
              </Field>
            </div>
            <Field label="Title" error={form.errors.title}>
              <input className={inputClass} value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} />
            </Field>
            <Field label="Description" error={form.errors.description}>
              <textarea className={textareaClass} value={form.data.description} onChange={(e) => form.setData("description", e.target.value)} />
            </Field>
            <Field label="Order" error={form.errors.sort_order}>
              <input className={inputClass} type="number" value={form.data.sort_order} onChange={(e) => form.setData("sort_order", Number(e.target.value))} />
            </Field>
            <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <input type="checkbox" checked={form.data.is_published} onChange={(e) => form.setData("is_published", e.target.checked)} />
              published
            </label>
            <button disabled={form.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editing ? "save item" : "create item"}
            </button>
          </form>
        </section>

        <section className="space-y-5">
          <ItemGroup title="Graph nodes" items={nodes} onEdit={edit} />
          <ItemGroup title="Timeline" items={timeline} onEdit={edit} />
        </section>
      </div>
    </AdminLayout>
  );
}

function ItemGroup({ title, items, onEdit }: { title: string; items: KnowledgeItem[]; onEdit: (item: KnowledgeItem) => void }) {
  return (
    <div className="panel p-5">
      <span className="mono-label">records</span>
      <h2 className="mt-1 font-display text-2xl font-600">{title}</h2>
      <div className="mt-5 space-y-3">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="border border-border bg-surface/30 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-display text-lg font-600">{item.title}</div>
                  <div className="mt-1 font-mono text-xs text-primary">{item.year || item.label || item.type}</div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">#{item.sort_order}</div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={() => onEdit(item)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                  edit
                </button>
                <button type="button" onClick={() => router.delete(`/admin/knowledge/${item.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No items registered yet.</p>
        )}
      </div>
    </div>
  );
}
