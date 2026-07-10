import { Head } from "@inertiajs/react";
import { useState } from "react";
import { BookOpen, Boxes, BriefcaseBusiness, Camera, Cpu, Download, Github, Layers, Linkedin, Sparkles, X } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import type { AboutBook, AboutCuriosity, AboutGalleryPhoto, AboutPage } from "@/types/admin";

interface Props {
  about: AboutPage | null;
  books: AboutBook[];
  curiosities: AboutCuriosity[];
  galleryPhotos: AboutGalleryPhoto[];
}

const fallbackPrinciples = [
  { title: "Arquitetura primeiro", detail: "Limites e contratos antes de frameworks. Decisoes de design sao documentadas, nao presumidas." },
  { title: "IA como ferramenta", detail: "Fundamentada, avaliada e rastreavel: inteligencia que serve ao sistema, nao ao hype." },
  { title: "Evolucao continua", detail: "Cada projeto alimenta o proximo. Aprendizados se acumulam; nada e desperdicado." },
];

const icons = [Layers, Cpu, Boxes];

export default function About({ about, books, curiosities, galleryPhotos }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<AboutGalleryPhoto | null>(null);
  const principles = about?.principles?.length ? about.principles : fallbackPrinciples;
  const resumeUrl = about?.resume_path ? `/storage/${about.resume_path}` : null;
  const githubUrl = about?.github_url || "https://github.com/gejalabs";
  const linkedinUrl = about?.linkedin_url;
  const sections = [
    { id: "principios", label: "Principios", show: true },
    { id: "livros", label: "Livros", show: books.length > 0 },
    { id: "fotos", label: "Fotos", show: galleryPhotos.length > 0 },
    { id: "curiosidades", label: "Curiosidades", show: curiosities.length > 0 }
  ].filter((section) => section.show);

  return (
    <AppLayout>
      <Head>
        <title>Sobre GejaLabs | Portfolio de Engenharia de Software</title>
        <meta name="description" content="Conheca o GejaLabs, portfolio de engenharia de software focado em arquitetura, IA, backend e projetos de longo prazo." />
        <meta property="og:title" content="Sobre GejaLabs | Portfolio de Engenharia de Software" />
        <meta property="og:description" content="Conheca a missao, os principios e a trajetoria profissional por tras do GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/about" />
      </Head>

      <main id="about-top" className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="mono-label">{about?.eyebrow ?? "// readme"}</span>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-700 tracking-tight sm:text-5xl">
              {about?.title ?? "Sobre o laboratorio"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {about?.intro ?? "GejaLabs e um laboratorio pessoal de engenharia de software: um lugar para desenvolver projetos em arquitetura, inteligencia artificial, backend e experiencia do desenvolvedor."}
            </p>
          </div>

          <section className="panel p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center border border-primary/40 bg-surface text-primary shadow-neon">
                <BriefcaseBusiness className="size-5" />
              </span>
              <div>
                <span className="mono-label">perfil</span>
                <h2 className="font-display text-2xl font-600">Profissional e pessoal</h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Um recorte da minha trajetoria tecnica, leituras, curiosidades e registros que ajudam a mostrar quem constroi o laboratorio.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {resumeUrl ? (
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon">
                  <Download className="size-4" /> Curriculo
                </a>
              ) : null}
              {githubUrl ? (
                <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground">
                  <Github className="size-4" /> GitHub
                </a>
              ) : null}
              {linkedinUrl ? (
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2.5 font-mono text-sm text-foreground">
                  <Linkedin className="size-4" /> LinkedIn
                </a>
              ) : null}
            </div>
          </section>
        </section>

        <nav className="mt-8 border border-border bg-card/55 p-3 shadow-panel" aria-label="Indice da pagina Sobre">
          <div className="flex flex-wrap gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group inline-flex items-center gap-2 border border-border bg-surface/45 px-3 py-2 font-mono text-[0.68rem] text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
                {section.label}
              </a>
            ))}
          </div>
        </nav>

        <section id="principios" className="mt-10 scroll-mt-24">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="mono-label">base</span>
              <h2 className="mt-2 font-display text-3xl font-600">Principios</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={principle.title} className="border border-border bg-card/70 p-5 shadow-panel">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-3 font-display text-lg font-600">{principle.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{principle.detail}</p>
              </div>
            );
          })}
          </div>
        </section>

        {(books.length || galleryPhotos.length) ? (
          <section className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-8">
              {books.length ? (
                <div id="livros" className="scroll-mt-24">
                <SectionTitle eyebrow="biblioteca" title="Livros" description="Leituras que formam repertorio tecnico, criativo e pessoal." icon={BookOpen} />
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {books.map((book) => (
                    <article key={book.id} className="group grid grid-cols-[88px_1fr] gap-4 border border-border bg-card/60 p-3 shadow-panel transition-colors hover:border-primary/45">
                      <div className="overflow-hidden border border-border bg-surface/70">
                        {book.image_path ? (
                          <img src={`/storage/${book.image_path}`} alt={`Capa do livro ${book.title}`} className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                          <div className="grid h-32 place-items-center text-primary">
                            <BookOpen className="size-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[0.68rem] text-primary">{book.author}</span>
                        <h3 className="mt-1 break-words font-display text-lg font-600">{book.title}</h3>
                        <p className="mt-1 line-clamp-3 text-sm leading-6 text-muted-foreground">{book.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
                </div>
              ) : null}

              {curiosities.length ? (
                <div id="curiosidades" className="scroll-mt-24">
                  <SectionTitle eyebrow="off topic" title="Curiosidades" description="Pequenas notas pessoais, preferências e detalhes que ajudam a deixar a página menos só currículo." icon={Sparkles} />
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {curiosities.map((curiosity, index) => (
                      <article key={curiosity.id} className="group border border-border bg-card/45 p-4 shadow-panel transition-colors hover:border-primary/40">
                        <div className="flex items-start gap-3">
                          <span className="mt-1 grid size-7 shrink-0 place-items-center border border-primary/35 bg-primary/10 font-mono text-[0.65rem] text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-display text-base font-600">{curiosity.title}</h3>
                            <p className="mt-1 text-sm leading-6 text-muted-foreground">{curiosity.description}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {galleryPhotos.length ? (
              <div id="fotos" className="scroll-mt-24">
                <SectionTitle eyebrow="galeria" title="Fotos" description="Miniaturas menores, com foco na composicao geral. Clique para ver maior." icon={Camera} />
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {galleryPhotos.map((photo) => (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative overflow-hidden border border-border bg-card text-left shadow-panel transition-colors hover:border-primary/60"
                    >
                      <img
                        src={`/storage/${photo.image_path}`}
                        alt={photo.caption || "Foto da galeria"}
                        className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-36"
                      />
                      {photo.caption ? (
                        <span className="absolute inset-x-0 bottom-0 bg-background/72 px-3 py-2 text-xs text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          {photo.caption}
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

      </main>

      {selectedPhoto ? (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-background/88 p-4 backdrop-blur-md" role="dialog" aria-modal="true">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Fechar foto"
            className="absolute right-4 top-4 grid size-10 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <X className="size-5" />
          </button>
          <figure className="w-full max-w-4xl overflow-hidden border border-border bg-card shadow-panel">
            <img src={`/storage/${selectedPhoto.image_path}`} alt={selectedPhoto.caption || "Foto da galeria"} className="max-h-[78vh] w-full object-contain bg-background" />
            {selectedPhoto.caption ? <figcaption className="border-t border-border bg-surface/70 px-4 py-3 text-sm text-muted-foreground">{selectedPhoto.caption}</figcaption> : null}
          </figure>
        </div>
      ) : null}
    </AppLayout>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="size-5 text-primary" /> : null}
        <span className="mono-label">{eyebrow}</span>
      </div>
      <h2 className="mt-2 font-display text-3xl font-600">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
