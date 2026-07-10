import { Head, usePage } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, FlaskConical, ShieldCheck } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import { ExperimentCard } from "@/components/dashboard/ExperimentCard";
import type { PersonalProject, ProfessionalProject } from "@/types/admin";

type ProjectTab = "personal" | "professional";

interface Props {
  personalProjects: PersonalProject[];
  professionalProjects: ProfessionalProject[];
}

function tabFromUrl(url: string): ProjectTab {
  const query = url.includes("?") ? url.slice(url.indexOf("?")) : "";
  return new URLSearchParams(query).get("tab") === "professional" ? "professional" : "personal";
}

function toExperiment(project: PersonalProject) {
  return {
    id: String(project.id),
    slug: project.slug,
    index: `PROJETO #${String(project.id).padStart(2, "0")}`,
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
}

export default function ExperimentsIndex({ personalProjects, professionalProjects }: Props) {
  const { url } = usePage();
  const [activeTab, setActiveTab] = useState<ProjectTab>(() => tabFromUrl(url));

  useEffect(() => setActiveTab(tabFromUrl(url)), [url]);

  function selectTab(tab: ProjectTab) {
    setActiveTab(tab);
    window.history.replaceState(null, "", `/experiments?tab=${tab}`);
  }

  const copy = useMemo(
    () => ({
      personal: {
        eyebrow: "// projetos pessoais",
        title: "Projetos pessoais",
        description:
          "Nesta secao, apresento projetos desenvolvidos por iniciativa propria, com foco em aprendizado, pratica, portfolio e crescimento tecnico. Aqui compartilho repositorios, decisoes de arquitetura, funcionalidades implementadas e detalhes tecnicos.",
      },
      professional: {
        eyebrow: "// projetos profissionais",
        title: "Projetos profissionais",
        description:
          "Nesta secao, apresento projetos em que atuei profissionalmente como desenvolvedor, contribuindo com funcionalidades, manutencao, integracoes, melhorias de performance e evolucao tecnica.",
      },
    }),
    [],
  );

  return (
    <AppLayout>
      <Head>
        <title>Projetos | GejaLabs</title>
        <meta
          name="description"
          content="Navegue por projetos pessoais e profissionais do GejaLabs, incluindo arquitetura, IA, backend e pratica de engenharia."
        />
        <meta property="og:title" content="Projetos | GejaLabs" />
        <meta property="og:description" content="Um portfolio de projetos praticos de engenharia e estudos de caso do GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/experiments" />
      </Head>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <span className="mono-label">{copy[activeTab].eyebrow}</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">{copy[activeTab].title}</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">{copy[activeTab].description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          <TabButton active={activeTab === "personal"} onClick={() => selectTab("personal")}>
            <FlaskConical className="size-4" /> Projetos pessoais
          </TabButton>
          {professionalProjects.length > 0 && (
            <TabButton active={activeTab === "professional"} onClick={() => selectTab("professional")}>
              <BriefcaseBusiness className="size-4" /> Projetos profissionais
            </TabButton>
          )}
        </div>

        {activeTab === "professional" ? (
          <>
            <div className="mt-8 flex gap-3 border border-border bg-surface/40 p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                Como estes projetos foram desenvolvidos em ambiente corporativo, codigo-fonte, dados internos, credenciais, telas administrativas privadas e detalhes sensiveis de infraestrutura nao sao divulgados.
              </p>
            </div>
            <div className="mt-8 grid gap-5">
              {professionalProjects.map((project) => (
                <ProfessionalProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((project, index) => (
              <ExperimentCard key={project.id} experiment={toExperiment(project)} delay={index * 0.08} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function TabButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 border px-3 py-2 font-mono text-xs tracking-widest transition-colors ${
        active ? "border-primary bg-primary text-primary-foreground shadow-neon" : "border-border bg-surface/60 text-muted-foreground hover:border-primary/50 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function ProfessionalProjectCard({ project }: { project: ProfessionalProject }) {
  return (
    <article className="panel flex h-full flex-col gap-5 p-5 transition-colors hover:border-primary/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="mono-label">{project.company}</span>
          <h3 className="mt-2 font-display text-xl font-600 tracking-tight">{project.title}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground">{project.summary}</p>
        </div>
        <div className="border border-border bg-surface/60 px-2.5 py-1 font-mono text-[0.65rem] text-primary">{project.period}</div>
      </div>
      <div className="grid gap-3 border-y border-border py-4 text-sm sm:grid-cols-2">
        <div><div className="mono-label">Papel</div><p className="mt-1 text-foreground">{project.role}</p></div>
        <div><div className="mono-label">Modulos</div><p className="mt-1 text-muted-foreground">{project.modules?.join(" / ")}</p></div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <ListBlock title="Contribuicoes" items={project.contributions ?? []} />
        <ListBlock title="Desafios" items={project.challenges ?? []} />
        <ListBlock title="Aprendizados" items={project.lessons ?? []} />
      </div>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mono-label">{title}</div>
      <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 bg-primary" /><span>{item}</span></li>
        ))}
      </ul>
    </div>
  );
}
