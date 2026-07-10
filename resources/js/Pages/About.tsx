import { Head } from "@inertiajs/react";
import { BookOpen, Boxes, BriefcaseBusiness, Camera, Cpu, Download, Github, Layers, Linkedin, Sparkles } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import { Timeline } from "@/components/timeline/Timeline";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import type { AboutBook, AboutCuriosity, AboutGalleryPhoto, AboutPage, PersonalProject, WorkExperience } from "@/types/admin";

interface Props {
  about: AboutPage | null;
  experiences: WorkExperience[];
  terminalProjects: Pick<PersonalProject, "slug" | "title">[];
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

export default function About({ about, experiences, terminalProjects, books, curiosities, galleryPhotos }: Props) {
  const principles = about?.principles?.length ? about.principles : fallbackPrinciples;
  const resumeUrl = about?.resume_path ? `/storage/${about.resume_path}` : null;
  const githubUrl = about?.github_url || "https://github.com/gejalabs";
  const linkedinUrl = about?.linkedin_url;
  const experienceEntries = experiences.map((experience) => ({
    year: `${formatDate(experience.started_at)} - ${experience.is_current ? "Atual" : formatDate(experience.ended_at)}`,
    title: `${experience.role} em ${experience.company}`,
    detail: experience.description,
    tags: experience.tags ?? [],
  }));

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

      <main id="contact" className="mx-auto max-w-6xl px-5 py-14">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <span className="mono-label">{about?.eyebrow ?? "// readme"}</span>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-700 tracking-tight sm:text-5xl">
              {about?.title ?? "Sobre o laboratorio"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {about?.intro ?? "GejaLabs e um laboratorio pessoal de engenharia de software: um lugar para desenvolver projetos em arquitetura, inteligencia artificial, backend e experiencia do desenvolvedor."}
            </p>
          </div>

          <div className="panel p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center border border-primary/40 bg-surface text-primary shadow-neon">
                <BriefcaseBusiness className="size-5" />
              </span>
              <div>
                <span className="mono-label">career</span>
                <h2 className="font-display text-2xl font-600">Meu curriculo</h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Uma visao direta da minha experiencia, tecnologias, responsabilidades e evolucao profissional.
            </p>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon"
              >
                <Download className="size-4" /> Ver curriculo
              </a>
            ) : null}
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
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
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <SectionTitle eyebrow="trajetoria" title="Timeline profissional" description="Como minha experiencia pratica evoluiu em projetos reais, equipes e responsabilidades tecnicas." />
            {experiences.length ? (
              <div className="mt-6">
                <Timeline entries={experienceEntries} />
              </div>
            ) : (
              <div className="panel mt-6 p-5 text-sm text-muted-foreground">Nenhuma experiencia profissional cadastrada ainda.</div>
            )}
          </div>

          <div className="space-y-6">
            {curiosities.length ? (
              <section className="panel p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-5 text-primary" />
                  <div>
                    <span className="mono-label">off topic</span>
                    <h2 className="font-display text-2xl font-600">Curiosidades</h2>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {curiosities.map((curiosity, index) => (
                    <article key={curiosity.id} className="grid grid-cols-[auto_1fr] gap-4 border border-border bg-surface/45 p-4">
                      <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3 className="font-display text-lg font-600">{curiosity.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{curiosity.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="panel p-5">
              <h2 className="font-display text-2xl font-600">{about?.contact_title ?? "Entre em contato"}</h2>
              <p className="mt-2 text-muted-foreground">
                {about?.contact_text ?? "O laboratorio esta aberto. Explore os projetos, leia os relatos tecnicos ou entre em contato pelo repositorio."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {githubUrl ? (
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-transform hover:-translate-y-0.5">
                    <Github className="size-4" /> Visitar GitHub
                  </a>
                ) : null}
                {linkedinUrl ? (
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-border bg-surface px-4 py-2.5 font-mono text-sm font-600 text-foreground transition-transform hover:-translate-y-0.5">
                    <Linkedin className="size-4" /> Visitar LinkedIn
                  </a>
                ) : null}
              </div>
            </section>
          </div>
        </section>

        {books.length ? (
          <section className="mt-16">
            <SectionTitle eyebrow="biblioteca" title="Livros que li" description="Algumas leituras que ajudam a formar meu repertorio tecnico, criativo e pessoal." icon={BookOpen} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <article key={book.id} className="group border border-border bg-card/70 p-3 shadow-panel transition-transform hover:-translate-y-0.5">
                  {book.image_path ? (
                    <div className="overflow-hidden border border-border bg-surface">
                      <img src={`/storage/${book.image_path}`} alt={`Capa do livro ${book.title}`} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : null}
                  <div className="p-2">
                    <span className="font-mono text-xs text-primary">{book.author}</span>
                    <h3 className="mt-2 font-display text-xl font-600">{book.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{book.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {galleryPhotos.length ? (
          <section className="mt-16">
            <SectionTitle eyebrow="galeria" title="Fotos" description="Um pedaco mais visual do laboratorio: registros, lugares, detalhes e bastidores." icon={Camera} />
            <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {galleryPhotos.map((photo) => (
                <figure key={photo.id} className="mb-4 break-inside-avoid overflow-hidden border border-border bg-card/70 shadow-panel">
                  <img src={`/storage/${photo.image_path}`} alt={photo.caption || "Foto da galeria"} className="w-full object-cover" />
                  {photo.caption ? <figcaption className="border-t border-border bg-surface/60 px-4 py-3 text-sm text-muted-foreground">{photo.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <TerminalWindow projects={terminalProjects} />
        </section>
      </main>
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

function formatDate(value: string | null) {
  if (!value) return "Atual";
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(value));
}
