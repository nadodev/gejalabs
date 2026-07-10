import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, CalendarDays, PenLine, Tag } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import type { BlogPost } from "@/types/admin";

interface Props {
  post: BlogPost;
  contentHtml: string;
}

function coverUrl(post: BlogPost) {
  return post.cover_path ? `/storage/${post.cover_path}` : null;
}

function formatDate(value: string | null) {
  if (!value) return "Sem data";
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

export default function BlogShow({ post, contentHtml }: Props) {
  const cover = coverUrl(post);

  return (
    <AppLayout>
      <Head>
        <title>{post.title} | GejaLabs</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} | GejaLabs`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={cover ?? "/og-image.svg"} />
        <link rel="canonical" href={`https://gejalabs.com.br/blog/${post.slug}`} />
      </Head>

      <article className="mx-auto max-w-4xl px-5 py-14">
        <Link href="/blog" className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-3.5" /> voltar para o blog
        </Link>

        <header className="mt-5">
          <span className="mono-label">// artigo</span>
          <h1 className="mt-3 font-display text-4xl font-700 tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4 text-primary" />
              {formatDate(post.published_at)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PenLine className="size-4 text-primary" />
              {post.author}
            </span>
          </div>
          {post.tags?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                  <Tag className="size-3" />
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        {cover ? (
          <img src={cover} alt="" className="mt-8 aspect-[16/8] w-full border border-border object-cover" />
        ) : null}

        <div className="markdown-content mt-10" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </AppLayout>
  );
}
