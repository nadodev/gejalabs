import type { Metadata } from "next";
import { ExperimentCard } from "@/components/dashboard/ExperimentCard";
import { experiments } from "@/data/experiments";

export const metadata: Metadata = {
  title: "Experiments",
  description: "The full log of GejaLabs experiments across architecture, AI and backend systems.",
  openGraph: {
    title: "Experiments - GejaLabs",
    description: "Running, stable and planned software engineering experiments.",
  },
};

export default function ExperimentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <span className="mono-label">// experiment log</span>
      <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
        Experiments
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every experiment is a self-contained study, from architecture decisions to lessons
        learned. Some are stable, some still running.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((experiment, index) => (
          <ExperimentCard key={experiment.id} experiment={experiment} delay={index * 0.08} />
        ))}
      </div>
    </div>
  );
}
