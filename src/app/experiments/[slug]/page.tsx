import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { experiments, getExperiment } from "@/data/experiments";

interface ExperimentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export async function generateMetadata({ params }: ExperimentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    return {
      title: "Experiment not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: experiment.title,
    description: experiment.summary,
    openGraph: {
      title: `${experiment.title} - GejaLabs`,
      description: experiment.summary,
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-5">
      <h2 className="mono-label text-primary">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ExperimentDetailPage({ params }: ExperimentDetailPageProps) {
  const { slug } = await params;
  const experiment = getExperiment(slug);

  if (!experiment) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <Link
        href="/experiments"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-3.5" /> experiment log
      </Link>

      <header className="mt-4 panel p-6 shadow-neon">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="mono-label">{experiment.index} · EXPERIMENT REPORT</span>
          <StatusBadge status={experiment.status} />
        </div>
        <h1 className="mt-3 font-display text-3xl font-700 tracking-tight sm:text-4xl">
          {experiment.title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{experiment.summary}</p>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <div className="min-w-40 flex-1">
            <div className="mb-1 flex justify-between font-mono text-[0.65rem] text-muted-foreground">
              <span>PROGRESS</span>
              <span className="text-primary">{experiment.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface">
              <div className="h-full rounded-full bg-primary" style={{ width: `${experiment.progress}%` }} />
            </div>
          </div>
          <a
            href={experiment.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 font-mono text-xs transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Github className="size-4" /> Repository <ExternalLink className="size-3" />
          </a>
        </div>
      </header>

      <div className="mt-6 grid gap-5">
        <Section title="Overview">{experiment.overview}</Section>
        <Section title="Architecture">{experiment.architecture}</Section>

        <div className="panel p-5">
          <h2 className="mono-label text-primary">Technology Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {experiment.tech.map((tech) => (
              <span key={tech} className="rounded border border-border bg-surface/60 px-2.5 py-1 font-mono text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Section title="Decisions">
            <List items={experiment.decisions} />
          </Section>
          <Section title="Challenges">
            <List items={experiment.challenges} />
          </Section>
        </div>
        <Section title="Lessons Learned">
          <List items={experiment.lessons} />
        </Section>
      </div>
    </div>
  );
}
