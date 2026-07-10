import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import { Field, arrayToText, inputClass, textareaClass } from "@/Pages/Admin/Shared/Fields";
import type { BlogPost } from "@/types/admin";

interface Props {
  posts: BlogPost[];
}

const empty = {
  title: "",
  slug: "",
  author: "Leonardo Geja",
  cover: null as File | null,
  description: "",
  content: "",
  tags: "",
  published_at: "",
  is_published: false,
};

function formatDateInput(value: string | null) {
  if (!value) return "";
  return value.slice(0, 16);
}

function formatDate(value: string | null) {
  if (!value) return "rascunho";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function coverUrl(post: BlogPost) {
  return post.cover_path ? `/storage/${post.cover_path}` : null;
}

export default function BlogAdminIndex({ posts }: Props) {
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const form = useForm(empty);

  function edit(post: BlogPost) {
    setEditing(post);
    form.setData({
      title: post.title,
      slug: post.slug,
      author: post.author,
      cover: null,
      description: post.description,
      content: post.content,
      tags: arrayToText(post.tags).replaceAll("\n", ", "),
      published_at: formatDateInput(post.published_at),
      is_published: post.is_published,
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
      form
        .transform((data) => ({ ...data, _method: "put" }))
        .post(`/admin/blog/${editing.id}`, {
          forceFormData: true,
          onSuccess: reset,
        });
      return;
    }

    form.post("/admin/blog", {
      forceFormData: true,
      onSuccess: reset,
    });
  }

  return (
    <AdminLayout title="Blog" eyebrow="// artigos e tutoriais">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="mono-label">formulario</span>
              <h2 className="mt-1 font-display text-2xl font-600">{editing ? "Editar artigo" : "Novo artigo"}</h2>
            </div>
            {editing ? (
              <button type="button" onClick={reset} className="border border-border bg-surface px-3 py-2 font-mono text-xs text-muted-foreground">
                cancelar
              </button>
            ) : null}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Titulo" error={form.errors.title}>
              <input className={inputClass} value={form.data.title} onChange={(e) => form.setData("title", e.target.value)} />
            </Field>
            <Field label="Slug" error={form.errors.slug}>
              <input className={inputClass} value={form.data.slug} onChange={(e) => form.setData("slug", e.target.value)} placeholder="gerado automaticamente se vazio" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Autor" error={form.errors.author}>
                <input className={inputClass} value={form.data.author} onChange={(e) => form.setData("author", e.target.value)} />
              </Field>
              <Field label="Data de publicacao" error={form.errors.published_at}>
                <input className={inputClass} type="datetime-local" value={form.data.published_at} onChange={(e) => form.setData("published_at", e.target.value)} />
              </Field>
            </div>
            <Field label="Capa" error={form.errors.cover}>
              <input
                className="w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors file:mr-3 file:border-0 file:bg-primary file:px-3 file:py-1.5 file:font-mono file:text-primary-foreground focus:border-primary"
                type="file"
                accept="image/*"
                onChange={(e) => form.setData("cover", e.target.files?.[0] ?? null)}
              />
              {editing && coverUrl(editing) ? (
                <img src={coverUrl(editing) ?? ""} alt="" className="mt-3 aspect-[16/7] w-full border border-border object-cover" />
              ) : null}
            </Field>
            <Field label="Descricao" error={form.errors.description}>
              <textarea className={textareaClass} value={form.data.description} onChange={(e) => form.setData("description", e.target.value)} />
            </Field>
            <Field label="Texto em Markdown" error={form.errors.content}>
              <textarea
                className="min-h-80 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-primary"
                value={form.data.content}
                onChange={(e) => form.setData("content", e.target.value)}
                placeholder={"## Titulo da secao\n\nEscreva o artigo usando Markdown."}
              />
            </Field>
            <Field label="Tags separadas por virgula" error={form.errors.tags}>
              <input className={inputClass} value={form.data.tags} onChange={(e) => form.setData("tags", e.target.value)} placeholder="Laravel, Arquitetura, Tutorial" />
            </Field>
            <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <input type="checkbox" checked={form.data.is_published} onChange={(e) => form.setData("is_published", e.target.checked)} />
              publicado
            </label>
            <button disabled={form.processing} className="w-full bg-primary px-4 py-3 font-mono text-sm font-600 text-primary-foreground shadow-neon">
              {editing ? "salvar alteracoes" : "criar artigo"}
            </button>
          </form>
        </section>

        <PostList posts={posts} onEdit={edit} />
      </div>
    </AdminLayout>
  );
}

function PostList({ posts, onEdit }: { posts: BlogPost[]; onEdit: (post: BlogPost) => void }) {
  return (
    <section className="panel p-5">
      <span className="mono-label">registros</span>
      <h2 className="mt-1 font-display text-2xl font-600">Artigos cadastrados</h2>
      <div className="mt-5 space-y-3">
        {posts.length ? (
          posts.map((post) => (
            <div key={post.id} className="border border-border bg-surface/30 p-4">
              <div className="flex gap-4">
                {coverUrl(post) ? (
                  <img src={coverUrl(post) ?? ""} alt="" className="hidden aspect-square size-20 shrink-0 border border-border object-cover sm:block" />
                ) : null}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-lg font-600">{post.title}</div>
                      <div className="mt-1 font-mono text-xs text-muted-foreground">{post.slug}</div>
                    </div>
                    <div className="font-mono text-xs text-primary">{post.is_published ? "publicado" : "rascunho"}</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{post.description}</p>
                  <div className="mt-2 font-mono text-[0.65rem] text-muted-foreground">
                    {post.author} / {formatDate(post.published_at)}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => onEdit(post)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                      editar
                    </button>
                    <button type="button" onClick={() => router.delete(`/admin/blog/${post.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
                      excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum artigo cadastrado ainda.</p>
        )}
      </div>
    </section>
  );
}
