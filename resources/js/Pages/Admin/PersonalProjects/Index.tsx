import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, arrayToText, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { PersonalProject } from "@/types/admin";

interface Props {
  projects: PersonalProject[];
}

const empty = {
  title: "",
  slug: "",
  status: "planned",
  progress: 0,
  summary: "",
  tech: "",
  overview: "",
  architecture: "",
  decisions: "",
  challenges: "",
  lessons: "",
  repo_url: "",
  live_url: "",
  is_published: true,
};

export default function PersonalProjectsIndex({ projects }: Props) {
  const [editing, setEditing] = useState<PersonalProject | null>(null);
  const form = useForm(empty);

  function edit(project: PersonalProject) {
    setEditing(project);
    form.setData({
      title: project.title,
      slug: project.slug,
      status: project.status,
      progress: project.progress,
      summary: project.summary,
      tech: arrayToText(project.tech),
      overview: project.overview ?? "",
      architecture: project.architecture ?? "",
      decisions: arrayToText(project.decisions),
      challenges: arrayToText(project.challenges),
      lessons: arrayToText(project.lessons),
      repo_url: project.repo_url ?? "",
      live_url: project.live_url ?? "",
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
      form.put(`/admin/personal-projects/${editing.id}`, { onSuccess: reset });
    } else {
      form.post("/admin/personal-projects", { onSuccess: reset });
    }
  }

  return (
    <AdminLayout title="Projetos pessoais" eyebrow="// personal projects">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="mono-label">form</span>
              <h2 className="mt-1 font-display text-2xl font-600">{editing ? "Editar projeto" : "Novo projeto"}</h2>
            </div>
            {editing ? (
              <button onClick={reset} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
                cancelar
              </button>
            ) : null}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Título" error={form.errors.title}>
              <input className={inputClass} value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} />
            </Field>
            <Field label="Slug" error={form.errors.slug}>
              <input className={inputClass} value={form.data.slug} onChange={(e) => form.setData("slug", e.target.value)} placeholder="gerado automaticamente se vazio" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Status" error={form.errors.status}>
                <select className={inputClass} value={form.data.status} onChange={(e) => form.setData("status", e.target.value)}>
                  <option value="planned">planned</option>
                  <option value="running">running</option>
                  <option value="stable">stable</option>
                  <option value="failed">failed</option>
                </select>
              </Field>
              <Field label="Progresso" error={form.errors.progress}>
                <input className={inputClass} type="number" min="0" max="100" value={form.data.progress} onChange={(e) => form.setData("progress", Number(e.target.value))} />
              </Field>
            </div>
            <Field label="Resumo" error={form.errors.summary}>
              <textarea className={textareaClass} value={form.data.summary} onChange={(e) => form.setData("summary", e.target.value)} />
            </Field>
            <Field label="Tecnologias (uma por linha)" error={form.errors.tech}>
              <textarea className={textareaClass} value={form.data.tech} onChange={(e) => form.setData("tech", e.target.value)} />
            </Field>
            <Field label="Overview" error={form.errors.overview}>
              <textarea className={textareaClass} value={form.data.overview} onChange={(e) => form.setData("overview", e.target.value)} />
            </Field>
            <Field label="Arquitetura" error={form.errors.architecture}>
              <textarea className={textareaClass} value={form.data.architecture} onChange={(e) => form.setData("architecture", e.target.value)} />
            </Field>
            <Field label="Decisões (uma por linha)" error={form.errors.decisions}>
              <textarea className={textareaClass} value={form.data.decisions} onChange={(e) => form.setData("decisions", e.target.value)} />
            </Field>
            <Field label="Desafios (um por linha)" error={form.errors.challenges}>
              <textarea className={textareaClass} value={form.data.challenges} onChange={(e) => form.setData("challenges", e.target.value)} />
            </Field>
            <Field label="Aprendizados (um por linha)" error={form.errors.lessons}>
              <textarea className={textareaClass} value={form.data.lessons} onChange={(e) => form.setData("lessons", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub" error={form.errors.repo_url}>
                <input className={inputClass} value={form.data.repo_url} onChange={(e) => form.setData("repo_url", e.target.value)} />
              </Field>
              <Field label="Online" error={form.errors.live_url}>
                <input className={inputClass} value={form.data.live_url} onChange={(e) => form.setData("live_url", e.target.value)} />
              </Field>
            </div>
            <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <input type="checkbox" checked={form.data.is_published} onChange={(e) => form.setData("is_published", e.target.checked)} />
              publicado
            </label>
            <button disabled={form.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editing ? "salvar alterações" : "criar projeto"}
            </button>
          </form>
        </section>

        <ProjectList projects={projects} onEdit={edit} />
      </div>
    </AdminLayout>
  );
}

function ProjectList({ projects, onEdit }: { projects: PersonalProject[]; onEdit: (project: PersonalProject) => void }) {
  return (
    <section className="panel p-5">
      <span className="mono-label">records</span>
      <h2 className="mt-1 font-display text-2xl font-600">Cadastrados</h2>
      <div className="mt-5 space-y-3">
        {projects.map((project) => (
          <div key={project.id} className="border border-border bg-surface/30 p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-display text-lg font-600">{project.title}</div>
                <div className="mt-1 font-mono text-xs text-muted-foreground">{project.slug}</div>
              </div>
              <div className="font-mono text-xs text-primary">{project.status} · {project.progress}%</div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{project.summary}</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => onEdit(project)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                editar
              </button>
              <button onClick={() => router.delete(`/admin/personal-projects/${project.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
                excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
