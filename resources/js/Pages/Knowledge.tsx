import { Head } from "@inertiajs/react";
import { AppLayout } from "@/Layouts/AppLayout";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import { Timeline } from "@/components/timeline/Timeline";
import type { KnowledgeItem } from "@/types/admin";

interface Props {
  timeline: KnowledgeItem[];
  nodes: KnowledgeItem[];
}

const fallbackTimeline = [
  { year: "2024", title: "Fundamentos Java", detail: "POO, estrutura da JVM e fundamentos de engenharia backend." },
  { year: "2025", title: "Laravel e arquitetura", detail: "Domain-Driven Design, monolitos modulares e produtos API-first." },
  { year: "2026", title: "IA e arquitetura", detail: "Sistemas com recuperacao aumentada, nucleos orientados a eventos e experiencia do desenvolvedor." },
];

export default function Knowledge({ timeline, nodes }: Props) {
  const entries = timeline.length
    ? timeline.map((item) => ({ year: item.year ?? "Agora", title: item.title, detail: item.description }))
    : fallbackTimeline;

  return (
    <AppLayout>
      <Head>
        <title>Conhecimento | GejaLabs</title>
        <meta
          name="description"
          content="Explore o grafo de conhecimento e a timeline tecnica do GejaLabs, conectando arquitetura, IA e engenharia backend."
        />
        <meta property="og:title" content="Conhecimento | GejaLabs" />
        <meta property="og:description" content="Um mapa estruturado de conceitos, ferramentas e aprendizados por tras dos projetos do GejaLabs." />
        <meta property="og:image" content="/og-image.svg" />
        <link rel="canonical" href="https://gejalabs.com.br/knowledge" />
      </Head>
      <div className="mx-auto max-w-6xl px-5 py-14">
        <span className="mono-label">// base de conhecimento</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
          Grafo de conhecimento
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          O laboratorio conecta tecnologias e padroes em vez de apenas lista-los. Cada no representa uma
          ferramenta em uso ativo nos projetos.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <KnowledgeGraph items={nodes} />

          <div>
            <h2 className="font-display text-2xl font-600">Timeline de evolucao</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              Como o foco do laboratorio evoluiu ao longo do tempo.
            </p>
            <Timeline entries={entries} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
