import { Head, Link } from "@inertiajs/react";
import { ArrowRight, CalendarDays, PenLine, Tag } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import type { BlogPost } from "@/types/admin";

interface Props {
  posts: BlogPost[];
}

function coverUrl(post: BlogPost) {
  return post.cover_path ? `/storage/${post.cover_path}` : null;
}

function formatDate(value: string | null) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export default function BlogIndex({ posts }: Props) {
  return (
    <AppLayout>
      <Head>
        <title>Blog | GejaLabs</title>
        <meta
          name="description"
          content="Artigos, tutoriais e notas tecnicas do GejaLabs sobre arquitetura, backend, IA e desenvolvimento de software."
        />
        <meta property="og:title" content="Blog | GejaLabs" />
        <meta property="og:description" content="Artigos e tutoriais praticos do laboratorio GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/blog" />
      </Head>

      <div className="mx-auto max-w-6xl px-5 py-14">
        <span className="mono-label">// artigos e tutoriais</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          Leituras praticas sobre arquitetura, backend, IA, processos de desenvolvimento e aprendizados do laboratorio.
        </p>

        {posts.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex min-h-full flex-col overflow-hidden border border-border bg-card/70 transition-colors hover:border-primary/40"
              >
                <div className="relative bg-surface">
                  {coverUrl(post) ? (
                    <img src={coverUrl(post) ?? ""} alt="" className="h-32 w-full object-cover object-center sm:h-36" />
                  ) : (
                    <div className="grid h-32 place-items-center text-primary sm:h-36">
                      <PenLine className="size-7" />
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/10 transition-colors group-hover:ring-primary/25" />
                </div>
                <div className="flex flex-1 min-w-0 flex-col p-4">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[0.65rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-primary" />
                      {formatDate(post.published_at)}
                    </span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="mt-2 line-clamp-2 font-display text-lg font-600 tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                  {post.tags?.length ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 border border-border bg-surface/70 px-2 py-0.5 font-mono text-[0.62rem] text-muted-foreground">
                          <Tag className="size-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-primary">
                    ler artigo
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="panel mt-10 p-6 text-sm text-muted-foreground">Nenhum artigo publicado ainda.</div>
        )}
      </div>
    </AppLayout>
  );
}
