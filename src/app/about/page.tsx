import type { Metadata } from "next";
import { Boxes, Cpu, Github, Layers } from "lucide-react";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";

export const metadata: Metadata = {
  title: "About",
  description:
    "GejaLabs is a personal software engineering laboratory focused on architecture, AI and backend systems.",
  openGraph: {
    title: "About - GejaLabs",
    description: "A personal laboratory for software engineering experiments.",
  },
};

const principles = [
  { icon: Layers, title: "Architecture first", detail: "Boundaries and contracts before frameworks. Design decisions are documented, not implied." },
  { icon: Cpu, title: "AI as a tool", detail: "Grounded, evaluated and traceable: intelligence that serves the system, not the hype." },
  { icon: Boxes, title: "Continuous evolution", detail: "Every experiment feeds the next. Lessons compound; nothing is thrown away." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <span className="mono-label">// readme</span>
      <h1 className="mt-2 font-display text-4xl font-700 tracking-tight sm:text-5xl">
        About the lab
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        GejaLabs is a personal software engineering laboratory: a place to run experiments in
        architecture, artificial intelligence, backend systems and developer experience. Not a
        portfolio; a research environment in continuous evolution.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {principles.map((principle) => (
          <div key={principle.title} className="panel p-5">
            <principle.icon className="size-5 text-primary" />
            <h3 className="mt-3 font-display text-lg font-600">{principle.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{principle.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-600">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">
            The lab is open. Explore the experiments, read the reports, or reach out through the
            repository.
          </p>
          <a
            href="https://github.com/gejalabs"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-transform hover:-translate-y-0.5"
          >
            <Github className="size-4" /> Visit GitHub
          </a>
             <a
            href="https://github.com/gejalabs"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-transform hover:-translate-y-0.5"
          >
            <Github className="size-4" /> Visit LinkedIn
          </a>
        </div>
        <TerminalWindow />
      </div>
    </div>
  );
}
