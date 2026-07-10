import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, arrayToText, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { AboutBook, AboutCuriosity, AboutGalleryPhoto, AboutPage, WorkExperience } from "@/types/admin";

interface Props {
  about: AboutPage;
  experiences: WorkExperience[];
  books: AboutBook[];
  curiosities: AboutCuriosity[];
  galleryPhotos: AboutGalleryPhoto[];
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

const emptyBook = {
  title: "",
  author: "",
  description: "",
  image: null as File | null,
  sort_order: 0,
  is_published: true,
};

const emptyCuriosity = {
  title: "",
  description: "",
  sort_order: 0,
  is_published: true,
};

const emptyPhoto = {
  image: null as File | null,
  caption: "",
  sort_order: 0,
  is_published: true,
};

export default function AboutEdit({ about, experiences, books, curiosities, galleryPhotos }: Props) {
  const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
  const [editingBook, setEditingBook] = useState<AboutBook | null>(null);
  const [editingCuriosity, setEditingCuriosity] = useState<AboutCuriosity | null>(null);
  const [editingPhoto, setEditingPhoto] = useState<AboutGalleryPhoto | null>(null);

  const aboutForm = useForm({
    _method: "put",
    eyebrow: about.eyebrow ?? "// readme",
    title: about.title ?? "Sobre o laboratorio",
    intro: about.intro ?? "",
    principles: (about.principles ?? []).map((item) => `${item.title}|${item.detail}`).join("\n"),
    contact_title: about.contact_title ?? "Entre em contato",
    contact_text: about.contact_text ?? "",
    github_url: about.github_url ?? "",
    linkedin_url: about.linkedin_url ?? "",
    resume: null as File | null,
  });
  const experienceForm = useForm(emptyExperience);
  const bookForm = useForm(emptyBook);
  const curiosityForm = useForm(emptyCuriosity);
  const photoForm = useForm(emptyPhoto);

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
      return;
    }

    experienceForm.post("/admin/work-experiences", { preserveScroll: true, onSuccess: resetExperience });
  }

  function editBook(book: AboutBook) {
    setEditingBook(book);
    bookForm.setData({
      title: book.title,
      author: book.author,
      description: book.description,
      image: null,
      sort_order: book.sort_order,
      is_published: book.is_published,
    });
  }

  function resetBook() {
    setEditingBook(null);
    bookForm.setData(emptyBook);
    bookForm.clearErrors();
  }

  function saveBook(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingBook) {
      router.post(`/admin/about-books/${editingBook.id}`, { ...bookForm.data, _method: "put" }, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: resetBook,
        onError: (errors) => bookForm.setError(errors),
      });
      return;
    }

    bookForm.post("/admin/about-books", { forceFormData: true, preserveScroll: true, onSuccess: resetBook });
  }

  function editCuriosity(curiosity: AboutCuriosity) {
    setEditingCuriosity(curiosity);
    curiosityForm.setData({
      title: curiosity.title,
      description: curiosity.description,
      sort_order: curiosity.sort_order,
      is_published: curiosity.is_published,
    });
  }

  function resetCuriosity() {
    setEditingCuriosity(null);
    curiosityForm.setData(emptyCuriosity);
    curiosityForm.clearErrors();
  }

  function saveCuriosity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingCuriosity) {
      curiosityForm.put(`/admin/about-curiosities/${editingCuriosity.id}`, { preserveScroll: true, onSuccess: resetCuriosity });
      return;
    }

    curiosityForm.post("/admin/about-curiosities", { preserveScroll: true, onSuccess: resetCuriosity });
  }

  function editPhoto(photo: AboutGalleryPhoto) {
    setEditingPhoto(photo);
    photoForm.setData({
      image: null,
      caption: photo.caption ?? "",
      sort_order: photo.sort_order,
      is_published: photo.is_published,
    });
  }

  function resetPhoto() {
    setEditingPhoto(null);
    photoForm.setData(emptyPhoto);
    photoForm.clearErrors();
  }

  function savePhoto(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (editingPhoto) {
      router.post(`/admin/about-gallery-photos/${editingPhoto.id}`, { ...photoForm.data, _method: "put" }, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: resetPhoto,
        onError: (errors) => photoForm.setError(errors),
      });
      return;
    }

    photoForm.post("/admin/about-gallery-photos", { forceFormData: true, preserveScroll: true, onSuccess: resetPhoto });
  }

  return (
    <AdminLayout title="Sobre" eyebrow="// page settings">
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className="panel p-5">
          <span className="mono-label">pagina publica</span>
          <h2 className="mt-1 font-display text-2xl font-600">Conteudo principal</h2>
          <form onSubmit={saveAbout} className="mt-6 space-y-4">
            <Field label="Eyebrow" error={aboutForm.errors.eyebrow}>
              <input className={inputClass} value={aboutForm.data.eyebrow} onChange={(e) => aboutForm.setData("eyebrow", e.target.value)} />
            </Field>
            <Field label="Titulo" error={aboutForm.errors.title}>
              <input className={inputClass} value={aboutForm.data.title} onChange={(e) => aboutForm.setData("title", e.target.value)} />
            </Field>
            <Field label="Introducao" error={aboutForm.errors.intro}>
              <textarea className={textareaClass} value={aboutForm.data.intro} onChange={(e) => aboutForm.setData("intro", e.target.value)} />
            </Field>
            <Field label="Principios (Titulo|Detalhe, um por linha)" error={aboutForm.errors.principles}>
              <textarea className={textareaClass} value={aboutForm.data.principles} onChange={(e) => aboutForm.setData("principles", e.target.value)} />
            </Field>
            <Field label="Curriculo" error={aboutForm.errors.resume}>
              <input className={inputClass} type="file" accept=".pdf,.doc,.docx" onChange={(e) => aboutForm.setData("resume", e.target.files?.[0] ?? null)} />
              {about.resume_path ? <p className="mt-2 font-mono text-xs text-muted-foreground">Atual: {about.resume_original_name}</p> : null}
            </Field>
            <Field label="Titulo do contato" error={aboutForm.errors.contact_title}>
              <input className={inputClass} value={aboutForm.data.contact_title} onChange={(e) => aboutForm.setData("contact_title", e.target.value)} />
            </Field>
            <Field label="Texto do contato" error={aboutForm.errors.contact_text}>
              <textarea className={textareaClass} value={aboutForm.data.contact_text} onChange={(e) => aboutForm.setData("contact_text", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="GitHub URL" error={aboutForm.errors.github_url}>
                <input className={inputClass} value={aboutForm.data.github_url} onChange={(e) => aboutForm.setData("github_url", e.target.value)} />
              </Field>
              <Field label="LinkedIn URL" error={aboutForm.errors.linkedin_url}>
                <input className={inputClass} value={aboutForm.data.linkedin_url} onChange={(e) => aboutForm.setData("linkedin_url", e.target.value)} />
              </Field>
            </div>
            <button disabled={aboutForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              salvar pagina sobre
            </button>
          </form>
        </section>

        <section className="panel p-5">
          <PanelTitle eyebrow="timeline" title="Experiencias" editing={Boolean(editingExperience)} onCancel={resetExperience} />
          <form onSubmit={saveExperience} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Empresa" error={experienceForm.errors.company}>
                <input className={inputClass} value={experienceForm.data.company} onChange={(e) => experienceForm.setData("company", e.target.value)} />
              </Field>
              <Field label="Cargo" error={experienceForm.errors.role}>
                <input className={inputClass} value={experienceForm.data.role} onChange={(e) => experienceForm.setData("role", e.target.value)} />
              </Field>
            </div>
            <Field label="Descricao" error={experienceForm.errors.description}>
              <textarea className={textareaClass} value={experienceForm.data.description} onChange={(e) => experienceForm.setData("description", e.target.value)} />
            </Field>
            <Field label="Tags (uma por linha)" error={experienceForm.errors.tags}>
              <textarea className={textareaClass} value={experienceForm.data.tags} onChange={(e) => experienceForm.setData("tags", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Inicio" error={experienceForm.errors.started_at}>
                <input className={inputClass} type="date" value={experienceForm.data.started_at} onChange={(e) => experienceForm.setData("started_at", e.target.value)} />
              </Field>
              <Field label="Fim" error={experienceForm.errors.ended_at}>
                <input className={inputClass} type="date" disabled={experienceForm.data.is_current} value={experienceForm.data.ended_at} onChange={(e) => experienceForm.setData("ended_at", e.target.value)} />
              </Field>
              <Field label="Ordem" error={experienceForm.errors.sort_order}>
                <input className={inputClass} type="number" value={experienceForm.data.sort_order} onChange={(e) => experienceForm.setData("sort_order", Number(e.target.value))} />
              </Field>
            </div>
            <Toggle checked={experienceForm.data.is_current} onChange={(checked) => experienceForm.setData((data) => ({ ...data, is_current: checked, ended_at: checked ? "" : data.ended_at }))}>
              trabalho atual
            </Toggle>
            <button disabled={experienceForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editingExperience ? "salvar experiencia" : "adicionar experiencia"}
            </button>
          </form>
          <AdminList>
            {experiences.map((experience) => (
              <AdminListItem key={experience.id} title={experience.company} subtitle={experience.role} published={experience.is_current ? "atual" : undefined} onEdit={() => editExperience(experience)} onDelete={() => router.delete(`/admin/work-experiences/${experience.id}`)}>
                {experience.description}
              </AdminListItem>
            ))}
          </AdminList>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="panel p-5">
          <PanelTitle eyebrow="off topic" title="Livros" editing={Boolean(editingBook)} onCancel={resetBook} />
          <form onSubmit={saveBook} className="mt-6 space-y-4">
            <Field label="Titulo" error={bookForm.errors.title}>
              <input className={inputClass} value={bookForm.data.title} onChange={(e) => bookForm.setData("title", e.target.value)} />
            </Field>
            <Field label="Autor" error={bookForm.errors.author}>
              <input className={inputClass} value={bookForm.data.author} onChange={(e) => bookForm.setData("author", e.target.value)} />
            </Field>
            <Field label="Descricao" error={bookForm.errors.description}>
              <textarea className={textareaClass} value={bookForm.data.description} onChange={(e) => bookForm.setData("description", e.target.value)} />
            </Field>
            <Field label="Capa" error={bookForm.errors.image}>
              <input className={inputClass} type="file" accept="image/*" onChange={(e) => bookForm.setData("image", e.target.files?.[0] ?? null)} />
              {editingBook?.image_path ? <img src={`/storage/${editingBook.image_path}`} alt="" className="mt-3 h-24 w-20 object-cover" /> : null}
            </Field>
            <SmallControls
              order={bookForm.data.sort_order}
              published={bookForm.data.is_published}
              orderError={bookForm.errors.sort_order}
              onOrder={(value) => bookForm.setData("sort_order", value)}
              onPublished={(value) => bookForm.setData("is_published", value)}
            />
            <button disabled={bookForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editingBook ? "salvar livro" : "adicionar livro"}
            </button>
          </form>
          <AdminList>
            {books.map((book) => (
              <AdminListItem key={book.id} title={book.title} subtitle={book.author} published={book.is_published ? "publicado" : "rascunho"} onEdit={() => editBook(book)} onDelete={() => router.delete(`/admin/about-books/${book.id}`)}>
                {book.description}
              </AdminListItem>
            ))}
          </AdminList>
        </section>

        <section className="panel p-5">
          <PanelTitle eyebrow="lista pessoal" title="Curiosidades" editing={Boolean(editingCuriosity)} onCancel={resetCuriosity} />
          <form onSubmit={saveCuriosity} className="mt-6 space-y-4">
            <Field label="Titulo" error={curiosityForm.errors.title}>
              <input className={inputClass} value={curiosityForm.data.title} onChange={(e) => curiosityForm.setData("title", e.target.value)} />
            </Field>
            <Field label="Descricao" error={curiosityForm.errors.description}>
              <textarea className={textareaClass} value={curiosityForm.data.description} onChange={(e) => curiosityForm.setData("description", e.target.value)} />
            </Field>
            <SmallControls
              order={curiosityForm.data.sort_order}
              published={curiosityForm.data.is_published}
              orderError={curiosityForm.errors.sort_order}
              onOrder={(value) => curiosityForm.setData("sort_order", value)}
              onPublished={(value) => curiosityForm.setData("is_published", value)}
            />
            <button disabled={curiosityForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editingCuriosity ? "salvar curiosidade" : "adicionar curiosidade"}
            </button>
          </form>
          <AdminList>
            {curiosities.map((curiosity) => (
              <AdminListItem key={curiosity.id} title={curiosity.title} published={curiosity.is_published ? "publicado" : "rascunho"} onEdit={() => editCuriosity(curiosity)} onDelete={() => router.delete(`/admin/about-curiosities/${curiosity.id}`)}>
                {curiosity.description}
              </AdminListItem>
            ))}
          </AdminList>
        </section>

        <section className="panel p-5">
          <PanelTitle eyebrow="masonry" title="Galeria" editing={Boolean(editingPhoto)} onCancel={resetPhoto} />
          <form onSubmit={savePhoto} className="mt-6 space-y-4">
            <Field label="Foto" error={photoForm.errors.image}>
              <input className={inputClass} type="file" accept="image/*" onChange={(e) => photoForm.setData("image", e.target.files?.[0] ?? null)} />
              {editingPhoto?.image_path ? <img src={`/storage/${editingPhoto.image_path}`} alt="" className="mt-3 h-24 w-32 object-cover" /> : null}
            </Field>
            <Field label="Legenda" error={photoForm.errors.caption}>
              <input className={inputClass} value={photoForm.data.caption} onChange={(e) => photoForm.setData("caption", e.target.value)} />
            </Field>
            <SmallControls
              order={photoForm.data.sort_order}
              published={photoForm.data.is_published}
              orderError={photoForm.errors.sort_order}
              onOrder={(value) => photoForm.setData("sort_order", value)}
              onPublished={(value) => photoForm.setData("is_published", value)}
            />
            <button disabled={photoForm.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editingPhoto ? "salvar foto" : "adicionar foto"}
            </button>
          </form>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {galleryPhotos.map((photo) => (
              <div key={photo.id} className="border border-border bg-surface/40 p-2">
                <img src={`/storage/${photo.image_path}`} alt="" className="h-28 w-full object-cover" />
                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{photo.caption || "Sem legenda"}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => editPhoto(photo)} className="border border-border bg-background px-2 py-1 font-mono text-[11px] text-foreground">editar</button>
                  <button type="button" onClick={() => router.delete(`/admin/about-gallery-photos/${photo.id}`)} className="border border-destructive/50 bg-background px-2 py-1 font-mono text-[11px] text-destructive">excluir</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}

function PanelTitle({ eyebrow, title, editing, onCancel }: { eyebrow: string; title: string; editing: boolean; onCancel: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <span className="mono-label">{eyebrow}</span>
        <h2 className="mt-1 font-display text-2xl font-600">{title}</h2>
      </div>
      {editing ? (
        <button type="button" onClick={onCancel} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
          cancelar
        </button>
      ) : null}
    </div>
  );
}

function SmallControls({
  order,
  published,
  orderError,
  onOrder,
  onPublished,
}: {
  order: number;
  published: boolean;
  orderError?: string;
  onOrder: (value: number) => void;
  onPublished: (value: boolean) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
      <Field label="Ordem" error={orderError}>
        <input className={inputClass} type="number" value={order} onChange={(e) => onOrder(Number(e.target.value))} />
      </Field>
      <Toggle checked={published} onChange={onPublished}>publicado</Toggle>
    </div>
  );
}

function Toggle({ checked, onChange, children }: { checked: boolean; onChange: (checked: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {children}
    </label>
  );
}

function AdminList({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 space-y-3">{children}</div>;
}

function AdminListItem({
  title,
  subtitle,
  published,
  children,
  onEdit,
  onDelete,
}: {
  title: string;
  subtitle?: string;
  published?: string;
  children: React.ReactNode;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="border border-border bg-surface/30 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-display text-lg font-600">{title}</div>
          {subtitle ? <div className="mt-1 font-mono text-xs text-primary">{subtitle}</div> : null}
        </div>
        {published ? <span className="font-mono text-xs text-muted-foreground">{published}</span> : null}
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{children}</p>
      <div className="mt-4 flex gap-2">
        <button type="button" onClick={onEdit} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
          editar
        </button>
        <button type="button" onClick={() => window.confirm("Remover este item?") && onDelete()} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
          excluir
        </button>
      </div>
    </div>
  );
}
