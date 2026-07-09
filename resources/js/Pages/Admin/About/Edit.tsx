import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, arrayToText, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { AboutPage, WorkExperience } from "@/types/admin";

interface Props {
  about: AboutPage;
  experiences: WorkExperience[];
}

const emptyExperience = {
  company: "",
  role: "",
  description: "",
  tags: "",
  started_at: "",
  ended_at: "",
  is_current: false,
  sort_order: 0,
};

export default function AboutEdit({ about, experiences }: Props) {
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
  const aboutForm = useForm({
    _method: "put",
    eyebrow: about.eyebrow ?? "// readme",
    title: about.title ?? "About the lab",
    intro: about.intro ?? "",
    principles: (about.principles ?? []).map((item) => `${item.title}|${item.detail}`).join("\n"),
    contact_title: about.contact_title ?? "Get in touch",
    contact_text: about.contact_text ?? "",
    github_url: about.github_url ?? "",
    linkedin_url: about.linkedin_url ?? "",
    resume: null as File | null,
  });
  const experienceForm = useForm(emptyExperience);

  function saveAbout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    aboutForm.post("/admin/about", {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => aboutForm.setData("resume", null),
    });
  }

  function editExperience(experience: WorkExperience) {
    setEditingExperience(experience);
    experienceForm.setData({
      company: experience.company,
      role: experience.role,
      description: experience.description,
      tags: arrayToText(experience.tags),
      started_at: experience.started_at?.slice(0, 10) ?? "",
      ended_at: experience.ended_at?.slice(0, 10) ?? "",
      is_current: experience.is_current,
      sort_order: experience.sort_order,
    });
  }

  function resetExperience() {
    setEditingExperience(null);
    experienceForm.setData(emptyExperience);
    experienceForm.clearErrors();
  }

  function saveExperience(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingExperience) {
      experienceForm.put(`/admin/work-experiences/${editingExperience.id}`, { preserveScroll: true, onSuccess: resetExperience });
    } else {
      experienceForm.post("/admin/work-experiences", { preserveScroll: true, onSuccess: resetExperience });
    }
  }

  return (
    <AdminLayout title="About" eyebrow="// page settings">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="panel p-5">
          <span className="mono-label">public page</span>
          <h2 className="mt-1 font-display text-2xl font-600">About content</h2>
          <form onSubmit={saveAbout} className="mt-6 space-y-4">
            <Field label="Eyebrow" error={aboutForm.errors.eyebrow}>
              <input className={inputClass} value={aboutForm.data.eyebrow} onChange={(e) => aboutForm.setData("eyebrow", e.target.value)} />
            </Field>
            <Field label="Title" error={aboutForm.errors.title}>
              <input className={inputClass} value={aboutForm.data.title} onChange={(e) => aboutForm.setData("title", e.target.value)} />
            </Field>
            <Field label="Intro" error={aboutForm.errors.intro}>
              <textarea className={textareaClass} value={aboutForm.data.intro} onChange={(e) => aboutForm.setData("intro", e.target.value)} />
            </Field>
            <Field label="Principles (Title|Detail, one per line)" error={aboutForm.errors.principles}>
              <textarea className={textareaClass} value={aboutForm.data.principles} onChange={(e) => aboutForm.setData("principles", e.target.value)} />
            </Field>
            <Field label="Resume PDF" error={aboutForm.errors.resume}>
              <input className={inputClass} type="file" accept=".pdf,.doc,.docx" onChange={(e) => aboutForm.setData("resume", e.target.files?.[0] ?? null)} />
              {about.resume_path ? <p className="mt-2 font-mono text-xs text-muted-foreground">Current: {about.resume_original_name}</p> : null}
            </Field>
            <Field label="Contact title" error={aboutForm.errors.contact_title}>
              <input className={inputClass} value={aboutForm.data.contact_title} onChange={(e) => aboutForm.setData("contact_title", e.target.value)} />
            </Field>
            <Field label="Contact text" error={aboutForm.errors.contact_text}>
              <textarea className={textareaClass} value={aboutForm.data.contact_text} onChange={(e) => aboutForm.setData("contact_text", e.target.value)} />
            </Field>
            <Field label="GitHub URL" error={aboutForm.errors.github_url}>
              <input className={inputClass} value={aboutForm.data.github_url} onChange={(e) => aboutForm.setData("github_url", e.target.value)} />
            </Field>
            <Field label="LinkedIn URL" error={aboutForm.errors.linkedin_url}>
              <input className={inputClass} value={aboutForm.data.linkedin_url} onChange={(e) => aboutForm.setData("linkedin_url", e.target.value)} />
            </Field>
            <button disabled={aboutForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              save about page
            </button>
          </form>
        </section>

        <section className="panel p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="mono-label">timeline</span>
              <h2 className="mt-1 font-display text-2xl font-600">Work experiences</h2>
            </div>
            {editingExperience ? (
              <button type="button" onClick={resetExperience} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
                cancel
              </button>
            ) : null}
          </div>

          <form onSubmit={saveExperience} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" error={experienceForm.errors.company}>
                <input className={inputClass} value={experienceForm.data.company} onChange={(e) => experienceForm.setData("company", e.target.value)} />
              </Field>
              <Field label="Role" error={experienceForm.errors.role}>
                <input className={inputClass} value={experienceForm.data.role} onChange={(e) => experienceForm.setData("role", e.target.value)} />
              </Field>
            </div>
            <Field label="Description" error={experienceForm.errors.description}>
              <textarea className={textareaClass} value={experienceForm.data.description} onChange={(e) => experienceForm.setData("description", e.target.value)} />
            </Field>
            <Field label="Tags (one per line)" error={experienceForm.errors.tags}>
              <textarea className={textareaClass} value={experienceForm.data.tags} onChange={(e) => experienceForm.setData("tags", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Start" error={experienceForm.errors.started_at}>
                <input className={inputClass} type="date" value={experienceForm.data.started_at} onChange={(e) => experienceForm.setData("started_at", e.target.value)} />
              </Field>
              <Field label="End" error={experienceForm.errors.ended_at}>
                <input className={inputClass} type="date" disabled={experienceForm.data.is_current} value={experienceForm.data.ended_at} onChange={(e) => experienceForm.setData("ended_at", e.target.value)} />
              </Field>
              <Field label="Order" error={experienceForm.errors.sort_order}>
                <input className={inputClass} type="number" value={experienceForm.data.sort_order} onChange={(e) => experienceForm.setData("sort_order", Number(e.target.value))} />
              </Field>
            </div>
            <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <input
                type="checkbox"
                checked={experienceForm.data.is_current}
                onChange={(e) => experienceForm.setData((data) => ({ ...data, is_current: e.target.checked, ended_at: e.target.checked ? "" : data.ended_at }))}
              />
              current work
            </label>
            <button disabled={experienceForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editingExperience ? "save experience" : "add experience"}
            </button>
          </form>

          <div className="mt-6 space-y-3">
            {experiences.map((experience) => (
              <div key={experience.id} className="border border-border bg-surface/30 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-lg font-600">{experience.company}</div>
                    <div className="mt-1 font-mono text-xs text-primary">{experience.role}</div>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {experience.started_at?.slice(0, 7)} - {experience.is_current ? "Current" : experience.ended_at?.slice(0, 7)}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{experience.description}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => editExperience(experience)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                    edit
                  </button>
                  <button type="button" onClick={() => router.delete(`/admin/work-experiences/${experience.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
                    delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
