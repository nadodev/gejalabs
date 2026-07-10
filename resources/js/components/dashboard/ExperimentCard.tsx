import { Link } from "@inertiajs/react";
import { motion } from "motion/react";
import { ArrowRight, FlaskConical } from "lucide-react";
import type { Experiment } from "@/data/experiments";
import { StatusBadge } from "./StatusBadge";

export function ExperimentCard({ experiment, delay = 0 }: { experiment: Experiment; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        href={`/experiments/${experiment.slug}`}
        className="group flex h-full min-w-0 flex-col gap-4 panel p-4 transition-all hover:border-primary/40 hover:shadow-neon sm:p-5"
      >
        <div className="flex min-w-0 items-center justify-between gap-3">
          <span className="inline-flex min-w-0 items-center gap-2 mono-label">
            <FlaskConical className="size-3.5 shrink-0 text-primary" />
            {experiment.index}
          </span>
          <StatusBadge status={experiment.status} />
        </div>

        <div className="min-w-0">
          <h3 className="break-words font-display text-lg font-600 tracking-tight sm:text-xl">{experiment.title}</h3>
          <p className="mt-1.5 break-words text-sm text-muted-foreground">{experiment.summary}</p>
        </div>

        <div className="mt-auto space-y-3">
          <div>
            <div className="mb-1 flex justify-between font-mono text-[0.65rem] text-muted-foreground">
              <span>PROGRESSO</span>
              <span className="text-primary">{experiment.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: `${experiment.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: delay + 0.2 }}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-wrap gap-1.5">
            {experiment.tech.map((tech) => (
              <span
                key={tech}
                className="rounded border border-border bg-surface/60 px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 pt-1 font-mono text-xs text-primary">
            Ver projeto
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
