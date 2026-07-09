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
  { year: "2024", title: "Java Foundations", detail: "OOP, JVM internals and the fundamentals of backend engineering." },
  { year: "2025", title: "Laravel & Architecture", detail: "Domain-Driven Design, modular monoliths and API-first products." },
  { year: "2026", title: "AI + Architecture", detail: "Retrieval-augmented systems, event-driven cores and developer experience." },
];

export default function Knowledge({ timeline, nodes }: Props) {
  const entries = timeline.length
    ? timeline.map((item) => ({ year: item.year ?? "Now", title: item.title, detail: item.description }))
    : fallbackTimeline;

  return (
    <AppLayout>
      <Head title="Knowledge" />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <span className="mono-label">// knowledge base</span>
        <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
          Knowledge Graph
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The lab connects technologies and patterns rather than listing them. Each node is a tool in
          active use across experiments.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <KnowledgeGraph items={nodes} />

          <div>
            <h2 className="font-display text-2xl font-600">Evolution timeline</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              How the lab&apos;s focus has evolved over time.
            </p>
            <Timeline entries={entries} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
