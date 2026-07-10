import { Head } from "@inertiajs/react";
import { Boxes, BriefcaseBusiness, Cpu, Download, Github, Layers, Linkedin } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import { Timeline } from "@/components/timeline/Timeline";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import type { AboutPage, PersonalProject, WorkExperience } from "@/types/admin";

interface Props {
  about: AboutPage | null;
  experiences: WorkExperience[];
  terminalProjects: Pick<PersonalProject, "slug" | "title">[];
}

const fallbackPrinciples = [
  { title: "Arquitetura primeiro", detail: "Limites e contratos antes de frameworks. Decisoes de design sao documentadas, nao presumidas." },
  { title: "IA como ferramenta", detail: "Fundamentada, avaliada e rastreavel: inteligencia que serve ao sistema, nao ao hype." },
  { title: "Evolucao continua", detail: "Cada projeto alimenta o proximo. Aprendizados se acumulam; nada e desperdicado." },
];

const icons = [Layers, Cpu, Boxes];

export default function About({ about, experiences, terminalProjects }: Props) {
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
        <meta
          name="description"
          content="Conheca o GejaLabs, portfolio de engenharia de software focado em arquitetura, IA, backend e projetos de longo prazo."
        />
        <meta property="og:title" content="Sobre GejaLabs | Portfolio de Engenharia de Software" />
        <meta property="og:description" content="Conheca a missao, os principios e a trajetoria profissional por tras do GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/about" />
      </Head>
      <div id="contact" className="mx-auto max-w-5xl px-5 py-14">
        <span className="mono-label">{about?.eyebrow ?? "// readme"}</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
          {about?.title ?? "Sobre o laboratorio"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {about?.intro ?? "GejaLabs e um laboratorio pessoal de engenharia de software: um lugar para desenvolver projetos em arquitetura, inteligencia artificial, backend e experiencia do desenvolvedor."}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={principle.title} className="panel p-5">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-3 font-display text-lg font-600">{principle.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{principle.detail}</p>
              </div>
            );
          })}
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="panel h-fit p-5 self-start">
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
              Veja meu curriculo para uma visao completa da minha experiencia, habilidades, tecnologias e trajetoria profissional.
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

          <div>
            {experiences.length ? (
              <>
                <h2 className="font-display text-2xl font-600">Timeline profissional</h2>
                <p className="mt-2 mb-6 text-sm text-muted-foreground">
                  Como minha experiencia pratica evoluiu em projetos reais, equipes e responsabilidades tecnicas.
                </p>
                <Timeline entries={experienceEntries} />
              </>
            ) : (
              <div className="panel p-5 text-sm text-muted-foreground">Nenhuma experiencia profissional cadastrada ainda.</div>
            )}
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-600">{about?.contact_title ?? "Entre em contato"}</h2>
            <p className="mt-2 text-muted-foreground">
              {about?.contact_text ?? "O laboratorio esta aberto. Explore os projetos, leia os relatos tecnicos ou entre em contato pelo repositorio."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
             {
              githubUrl ? (
                 <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-transform hover:-translate-y-0.5"
              >
                <Github className="size-4" /> Visitar GitHub
              </a>
              ): null
             }
             {
              linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-transform hover:-translate-y-0.5"
                >
                  <Linkedin className="size-4" /> Visitar LinkedIn
                </a>
              ) : null
             }
            </div>
          </div>
          <TerminalWindow projects={terminalProjects} />
        </div>
      </div>
    </AppLayout>
  );
}

function formatDate(value: string | null) {
  if (!value) return "Atual";
  return new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" }).format(new Date(value));
}
