import { Head } from "@inertiajs/react";
import { Boxes, BriefcaseBusiness, Cpu, Download, Github, Layers, Linkedin } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import type { AboutPage, PersonalProject, WorkExperience } from "@/types/admin";

interface Props {
  about: AboutPage | null;
  experiences: WorkExperience[];
  terminalProjects: Pick<PersonalProject, "slug" | "title">[];
}

const fallbackPrinciples = [
  { title: "Architecture first", detail: "Boundaries and contracts before frameworks. Design decisions are documented, not implied." },
  { title: "AI as a tool", detail: "Grounded, evaluated and traceable: intelligence that serves the system, not the hype." },
  { title: "Continuous evolution", detail: "Every experiment feeds the next. Lessons compound; nothing is thrown away." },
];

const icons = [Layers, Cpu, Boxes];

export default function About({ about, experiences, terminalProjects }: Props) {
  const principles = about?.principles?.length ? about.principles : fallbackPrinciples;
  const resumeUrl = about?.resume_path ? `/storage/${about.resume_path}` : null;
  const githubUrl = about?.github_url || "https://github.com/gejalabs";
  const linkedinUrl = about?.linkedin_url;

  return (
    <AppLayout>
      <Head>
        <title>About GejaLabs | Software Engineering Portfolio</title>
        <meta
          name="description"
          content="Learn about GejaLabs, the software engineering portfolio focused on architecture, AI, backend systems and long-term experiments."
        />
        <meta property="og:title" content="About GejaLabs | Software Engineering Portfolio" />
        <meta property="og:description" content="Discover the mission, principles and career journey behind GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/about" />
      </Head>
      <div id="contact" className="mx-auto max-w-5xl px-5 py-14">
        <span className="mono-label">{about?.eyebrow ?? "// readme"}</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
          {about?.title ?? "About the lab"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {about?.intro ?? "GejaLabs is a personal software engineering laboratory: a place to run experiments in architecture, artificial intelligence, backend systems and developer experience."}
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
                <h2 className="font-display text-2xl font-600">My Resume</h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              View my resume for a complete overview of my experience, skills, technologies, and career journey.
            </p>
            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 border border-primary bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon"
              >
                <Download className="size-4" /> View resume
              </a>
            ) : null}
          </div>

          <div className="space-y-4">
            {experiences.length ? (
              experiences.map((experience) => (
                <article key={experience.id} className="panel p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-600">{experience.company}</h3>
                      <p className="mt-1 font-mono text-xs text-primary">{experience.role}</p>
                    </div>
                    <div className="border border-border px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                      {formatDate(experience.started_at)} - {experience.is_current ? "Current" : formatDate(experience.ended_at)}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{experience.description}</p>
                  {experience.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <span key={tag} className="border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))
            ) : (
              <div className="panel p-5 text-sm text-muted-foreground">No work experiences registered yet.</div>
            )}
          </div>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-600">{about?.contact_title ?? "Get in touch"}</h2>
            <p className="mt-2 text-muted-foreground">
              {about?.contact_text ?? "The lab is open. Explore the experiments, read the reports, or reach out through the repository."}
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
                <Github className="size-4" /> Visit GitHub
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
                  <Linkedin className="size-4" /> Visit LinkedIn
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
  if (!value) return "Present";
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}
