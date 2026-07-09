import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { TechnicalNote } from "@/types/admin";

interface Props {
  notes: TechnicalNote[];
}

const empty = {
  title: "",
  slug: "",
  category: "",
  summary: "",
  content: "",
  tags: "",
  is_published: false,
};

export default function TechnicalNotesIndex({ notes }: Props) {
  const [editing, setEditing] = useState<TechnicalNote | null>(null);
  const form = useForm(empty);

  function edit(note: TechnicalNote) {
    setEditing(note);
    form.setData({
      title: note.title,
      slug: note.slug,
      category: note.category ?? "",
      summary: note.summary,
      content: note.content ?? "",
      tags: note.tags?.join(", ") ?? "",
      is_published: note.is_published,
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
      form.put(`/admin/technical-notes/${editing.id}`, { onSuccess: reset });
    } else {
      form.post("/admin/technical-notes", { onSuccess: reset });
    }
  }

  return (
    <AdminLayout title="Anotações técnicas" eyebrow="// knowledge base">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="mono-label">form</span>
              <h2 className="mt-1 font-display text-2xl font-600">{editing ? "Editar anotação" : "Nova anotação"}</h2>
            </div>
            {editing ? <button onClick={reset} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">cancelar</button> : null}
          </div>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Título" error={form.errors.title}><input className={inputClass} value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} /></Field>
            <Field label="Slug" error={form.errors.slug}><input className={inputClass} value={form.data.slug} onChange={(e) => form.setData("slug", e.target.value)} /></Field>
            <Field label="Categoria" error={form.errors.category}><input className={inputClass} value={form.data.category} onChange={(e) => form.setData("category", e.target.value)} /></Field>
            <Field label="Resumo" error={form.errors.summary}><textarea className={textareaClass} value={form.data.summary} onChange={(e) => form.setData("summary", e.target.value)} /></Field>
            <Field label="Conteúdo" error={form.errors.content}><textarea className="min-h-56 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-primary" value={form.data.content} onChange={(e) => form.setData("content", e.target.value)} /></Field>
            <Field label="Tags separadas por vírgula" error={form.errors.tags}><input className={inputClass} value={form.data.tags} onChange={(e) => form.setData("tags", e.target.value)} /></Field>
            <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <input type="checkbox" checked={form.data.is_published} onChange={(e) => form.setData("is_published", e.target.checked)} />
              publicado
            </label>
            <button disabled={form.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">{editing ? "salvar alterações" : "criar anotação"}</button>
          </form>
        </section>
        <section className="panel p-5">
          <span className="mono-label">records</span>
          <h2 className="mt-1 font-display text-2xl font-600">Cadastradas</h2>
          <div className="mt-5 space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="border border-border bg-surface/30 p-4">
                <div className="font-display text-lg font-600">{note.title}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{note.category ?? "sem categoria"} · {note.is_published ? "publicada" : "rascunho"}</div>
                <p className="mt-3 text-sm text-muted-foreground">{note.summary}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => edit(note)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">editar</button>
                  <button onClick={() => router.delete(`/admin/technical-notes/${note.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">excluir</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
