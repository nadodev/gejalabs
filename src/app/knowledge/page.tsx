import type { Metadata } from "next";
import { KnowledgeGraph } from "@/components/knowledge/KnowledgeGraph";
import { Timeline } from "@/components/timeline/Timeline";

export const metadata: Metadata = {
  title: "Knowledge",
  description:
    "A living map of the technologies, patterns and ideas connecting GejaLabs experiments.",
  openGraph: {
    title: "Knowledge - GejaLabs",
    description: "A living map of technologies and patterns across the lab.",
  },
};

const timeline = [
  { year: "2024", title: "Java Foundations", detail: "OOP, JVM internals and the fundamentals of backend engineering." },
  { year: "2025", title: "Laravel & Architecture", detail: "Domain-Driven Design, modular monoliths and API-first products." },
  { year: "2026", title: "AI + Architecture", detail: "Retrieval-augmented systems, event-driven cores and developer experience." },
];

export default function KnowledgePage() {
  return (
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
        <KnowledgeGraph />

        <div>
          <h2 className="font-display text-2xl font-600">Evolution timeline</h2>
          <p className="mt-2 mb-6 text-sm text-muted-foreground">
            How the lab&apos;s focus has evolved over time.
          </p>
          <Timeline entries={timeline} />
        </div>
      </div>
    </div>
  );
}
