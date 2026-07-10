import { Head, Link } from "@inertiajs/react";
import { CalendarDays, PenLine, Tag } from "lucide-react";
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
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="panel group overflow-hidden transition-colors hover:border-primary/40">
                {coverUrl(post) ? (
                  <img src={coverUrl(post) ?? ""} alt="" className="aspect-[16/8] w-full object-cover" />
                ) : (
                  <div className="grid aspect-[16/8] place-items-center bg-surface text-primary">
                    <PenLine className="size-8" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[0.65rem] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="size-3.5 text-primary" />
                      {formatDate(post.published_at)}
                    </span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-600 tracking-tight transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                  {post.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                          <Tag className="size-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
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
