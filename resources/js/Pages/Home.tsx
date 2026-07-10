import { Head, Link } from "@inertiajs/react";
import { motion } from "motion/react";
import { ArrowRight, BookOpenText, BriefcaseBusiness, FlaskConical, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { AppLayout } from "@/Layouts/AppLayout";
import { ExperimentCard } from "@/components/dashboard/ExperimentCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import type { PersonalProject } from "@/types/admin";

const focus = ["Arquitetura", "IA", "Backend", "Experiencia do desenvolvedor", "Front End", "DevOps", "Observabilidade", "Seguranca"];

interface Props {
  latestProjects: PersonalProject[];
  terminalProjects: Pick<PersonalProject, "slug" | "title">[];
  metrics: {
    projects: {
      total: number;
      stable: number;
      running: number;
    };
    experience: {
      years: number;
      since: number;
    };
    knowledge: {
      nodes: number;
      timeline: number;
    };
  };
}

interface GitHubProfile {
  public_repos: number;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { minimumIntegerDigits: 2 }).format(value);
}

export default function Home({ latestProjects, terminalProjects, metrics }: Props) {
  const [publicRepositories, setPublicRepositories] = useState<string>("...");

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://api.github.com/users/nadodev", {
      headers: { Accept: "application/vnd.github+json" },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nao foi possivel carregar o perfil do GitHub");
        }

        return response.json() as Promise<GitHubProfile>;
      })
      .then((profile) => {
        setPublicRepositories(formatNumber(profile.public_repos));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setPublicRepositories("--");
      });

    return () => controller.abort();
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>GejaLabs | Laboratorio de Engenharia de Software</title>
        <meta
          name="description"
          content="GejaLabs e um portfolio de engenharia de software com projetos de arquitetura, IA, backend e experiencia do desenvolvedor."
        />
        <meta property="og:title" content="GejaLabs | Laboratorio de Engenharia de Software" />
        <meta
          property="og:description"
          content="Explore projetos praticos de arquitetura, IA, backend e experiencia do desenvolvedor no GejaLabs."
        />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br" />
      </Head>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 mono-label"
            >
              <span className="size-1.5 rounded-full bg-primary pulse-dot" /> Laboratorio ativo
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 font-display text-5xl font-700 leading-none tracking-tight sm:text-7xl"
            >
              GEJA<span className="text-primary text-glow">LABS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 font-display text-xl text-muted-foreground sm:text-2xl"
            >
              Laboratorio de Engenharia de Software
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6 font-mono text-sm text-muted-foreground"
            >
              <span className="text-primary">$</span> construindo projetos em:
              <div className="mt-3 flex flex-wrap gap-2">
                {focus.map((item) => (
                  <span key={item} className="rounded border border-border bg-surface/60 px-2.5 py-1 text-foreground">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/experiments"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-transform hover:-translate-y-0.5"
              >
                <FlaskConical className="size-4" /> Explorar projetos
              </Link>
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                Grafo de conhecimento <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </div>

          <SystemStatus />
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={FlaskConical}
            label="Projetos"
            value={formatNumber(metrics.projects.total)}
            hint={`${metrics.projects.stable} estaveis / ${metrics.projects.running} em andamento`}
            href="/experiments"
          />
          <MetricCard
            icon={BriefcaseBusiness}
            label="Experiencia"
            value={`${metrics.experience.years}+`}
            hint={`desde ${metrics.experience.since}`}
            accent="info"
            delay={0.05}
            href="/about"
          />
          <MetricCard
            icon={BookOpenText}
            label="Conhecimento"
            value={formatNumber(metrics.knowledge.nodes)}
            hint={`${metrics.knowledge.timeline} itens na timeline`}
            delay={0.1}
            href="/knowledge"
          />
          <MetricCard
            icon={Github}
            label="Repositorios"
            value={publicRepositories}
            hint="publicos no GitHub"
            accent="warning"
            delay={0.15}
            href="https://github.com/nadodev"
            external
          />
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-600">Projetos ativos</h2>
              <Link href="/experiments" className="font-mono text-xs text-primary hover:underline">
                ver todos -&gt;
              </Link>
            </div>
            <div className="grid gap-4">
              {latestProjects.map((project, index) => {
                const experiment = {
                  id: String(project.id),
                  slug: project.slug,
                  index: `PROJECT #${String(project.id).padStart(3, "0")}`,
                  title: project.title,
                  summary: project.summary,
                  status: project.status,
                  progress: project.progress,
                  tech: project.tech ?? [],
                  overview: project.overview ?? "",
                  architecture: project.architecture ?? "",
                  decisions: project.decisions ?? [],
                  challenges: project.challenges ?? [],
                  lessons: project.lessons ?? [],
                  repo: project.repo_url ?? project.live_url ?? "#",
                };

                return <ExperimentCard key={project.id} experiment={experiment} delay={index * 0.1} />;
              })}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl font-600">Terminal</h2>
            <TerminalWindow projects={terminalProjects} />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
