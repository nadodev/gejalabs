import { Head } from "@inertiajs/react";
import { AppLayout } from "@/Layouts/AppLayout";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import { Timeline } from "@/components/timeline/Timeline";
import type { KnowledgeItem, WorkExperience } from "@/types/admin";

interface Props {
  timeline: KnowledgeItem[];
  nodes: KnowledgeItem[];
  experiences: WorkExperience[];
}

const fallbackTimeline = [
  { year: "2024", title: "Fundamentos Java", detail: "POO, estrutura da JVM e fundamentos de engenharia backend." },
  { year: "2025", title: "Laravel e arquitetura", detail: "Domain-Driven Design, monolitos modulares e produtos API-first." },
  { year: "2026", title: "IA e arquitetura", detail: "Sistemas com recuperacao aumentada, nucleos orientados a eventos e experiencia do desenvolvedor." },
];

export default function Knowledge({ timeline, nodes, experiences }: Props) {
  const entries = timeline.length
    ? timeline.map((item) => ({ year: item.year ?? "Agora", title: item.title, detail: item.description }))
    : fallbackTimeline;
  const currentExperience = experiences.find((experience) => experience.is_current);
  const pastExperiences = experiences.filter((experience) => !experience.is_current);
  const orderedExperiences = currentExperience ? [currentExperience, ...pastExperiences] : experiences;

  return (
    <AppLayout>
      <Head>
        <title>Experiencias | GejaLabs</title>
        <meta name="description" content="Experiencias profissionais, evolucao tecnica e grafo de conhecimento do GejaLabs." />
        <meta property="og:title" content="Experiencias | GejaLabs" />
        <meta property="og:description" content="Experiencias profissionais e mapa tecnico dos aprendizados por tras dos projetos do GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/knowledge" />
      </Head>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
        <span className="mono-label">// experiencias</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
          Experiencias
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Um recorte da trajetoria profissional, da evolucao tecnica e dos conhecimentos que sustentam os projetos do laboratorio.
        </p>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <KnowledgeGraph items={nodes} />

          <div>
            <h2 className="font-display text-2xl font-600">Timeline de evolucao</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              Como o foco tecnico do laboratorio evoluiu ao longo do tempo.
            </p>
            <Timeline entries={entries} />
          </div>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mono-label">trajetoria profissional</span>
              <h2 className="mt-2 font-display text-3xl font-600">Experiencias profissionais</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Uma leitura mais direta dos lugares, papeis e responsabilidades que moldaram minha pratica profissional.
              </p>
            </div>
            {currentExperience ? (
              <span className="border border-primary/50 bg-primary/10 px-3 py-2 font-mono text-xs text-primary">
                atual: {currentExperience.company}
              </span>
            ) : null}
          </div>

          {orderedExperiences.length ? (
            <div className="mt-6 space-y-4">
              {orderedExperiences.map((experience, index) => (
                <article
                  key={experience.id}
                  className={`relative overflow-hidden border bg-card/70 p-5 shadow-panel ${
                    experience.is_current ? "border-primary/55 shadow-neon" : "border-border"
                  }`}
                >
                  <div className="grid gap-4 md:grid-cols-[180px_1fr] md:items-start">
                    <div>
                      <span className={`inline-flex border px-3 py-1.5 font-mono text-[0.68rem] ${
                        experience.is_current ? "border-primary/50 bg-primary/10 text-primary" : "border-border bg-surface text-muted-foreground"
                      }`}>
                        {experience.is_current ? "ATUAL" : `EXPERIENCIA ${String(index + 1).padStart(2, "0")}`}
                      </span>
                      <div className="mt-3 font-mono text-xs text-muted-foreground">
                        {formatDate(experience.started_at)} - {experience.is_current ? "Atual" : formatDate(experience.ended_at)}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-2xl font-600">{experience.company}</h3>
                      <p className="mt-1 font-mono text-xs text-primary">{experience.role}</p>
                      <p className="mt-4 text-sm leading-6 text-muted-foreground">{experience.description}</p>
                      {experience.tags?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.tags.map((tag) => (
                            <span key={tag} className="border border-border bg-surface/70 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="panel mt-6 p-5 text-sm text-muted-foreground">Nenhuma experiencia profissional cadastrada ainda.</div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

function formatDate(value: string | null) {
  if (!value) return "Atual";
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(value));
}
