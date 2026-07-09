import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, arrayToText, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { ProfessionalProject } from "@/types/admin";

interface Props {
  projects: ProfessionalProject[];
}

const empty = {
  company: "",
  period: "",
  role: "",
  title: "",
  summary: "",
  tech: "",
  modules: "",
  contributions: "",
  challenges: "",
  lessons: "",
  is_published: true,
};

export default function ProfessionalProjectsIndex({ projects }: Props) {
  const [editing, setEditing] = useState<ProfessionalProject | null>(null);
  const form = useForm(empty);

  function edit(project: ProfessionalProject) {
    setEditing(project);
    form.setData({
      company: project.company,
      period: project.period ?? "",
      role: project.role,
      title: project.title,
      summary: project.summary,
      tech: arrayToText(project.tech),
      modules: arrayToText(project.modules),
      contributions: arrayToText(project.contributions),
      challenges: arrayToText(project.challenges),
      lessons: arrayToText(project.lessons),
      is_published: project.is_published,
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
      form.put(`/admin/professional-projects/${editing.id}`, { onSuccess: reset });
    } else {
      form.post("/admin/professional-projects", { onSuccess: reset });
    }
  }

  return (
    <AdminLayout title="Projetos profissionais" eyebrow="// professional work">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="mono-label">form</span>
              <h2 className="mt-1 font-display text-2xl font-600">{editing ? "Editar case" : "Novo case"}</h2>
            </div>
            {editing ? <button onClick={reset} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">cancelar</button> : null}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Empresa" error={form.errors.company}>
                <input className={inputClass} value={form.data.company} onChange={(e) => form.setData("company", e.target.value)} />
              </Field>
              <Field label="Período" error={form.errors.period}>
                <input className={inputClass} value={form.data.period} onChange={(e) => form.setData("period", e.target.value)} />
              </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Papel" error={form.errors.role}>
                <input className={inputClass} value={form.data.role} onChange={(e) => form.setData("role", e.target.value)} />
              </Field>
              <Field label="Título" error={form.errors.title}>
                <input className={inputClass} value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} />
              </Field>
            </div>
            <Field label="Resumo seguro" error={form.errors.summary}>
              <textarea className={textareaClass} value={form.data.summary} onChange={(e) => form.setData("summary", e.target.value)} />
            </Field>
            {(["tech", "modules", "contributions", "challenges", "lessons"] as const).map((field) => (
              <Field key={field} label={`${field} (um por linha)`} error={form.errors[field]}>
                <textarea className={textareaClass} value={form.data[field]} onChange={(e) => form.setData(field, e.target.value)} />
              </Field>
            ))}
            <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <input type="checkbox" checked={form.data.is_published} onChange={(e) => form.setData("is_published", e.target.checked)} />
              publicado
            </label>
            <button disabled={form.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editing ? "salvar alterações" : "criar case"}
            </button>
          </form>
        </section>

        <section className="panel p-5">
          <span className="mono-label">records</span>
          <h2 className="mt-1 font-display text-2xl font-600">Cadastrados</h2>
          <div className="mt-5 space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="border border-border bg-surface/30 p-4">
                <div className="font-display text-lg font-600">{project.title}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{project.company} · {project.period}</div>
                <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => edit(project)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">editar</button>
                  <button onClick={() => router.delete(`/admin/professional-projects/${project.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">excluir</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
