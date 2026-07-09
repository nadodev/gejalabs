import { Head, Link } from "@inertiajs/react";
import { motion } from "motion/react";
import { Activity, ArrowRight, Cpu, FlaskConical, GitBranch } from "lucide-react";
import { AppLayout } from "@/Layouts/AppLayout";
import { ExperimentCard } from "@/components/dashboard/ExperimentCard";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import { experiments } from "@/data/experiments";

const focus = ["Architecture", "AI", "Backend Systems", "Developer Experience", "Front End", "DevOps", "Observability", "Security"];

export default function Home() {
  return (
    <AppLayout>
      <Head title="Software Engineering Laboratory" />
      <div className="mx-auto max-w-6xl px-5 py-14">
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 mono-label"
            >
              <span className="size-1.5 rounded-full bg-primary pulse-dot" /> Laboratory active
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
              Software Engineering Laboratory
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-6 font-mono text-sm text-muted-foreground"
            >
              <span className="text-primary">$</span> building experiments in:
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
                <FlaskConical className="size-4" /> Explore experiments
              </Link>
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 font-mono text-sm transition-colors hover:border-primary/50 hover:text-primary"
              >
                Knowledge graph <ArrowRight className="size-4" />
              </Link>
            </motion.div>
          </div>

          <SystemStatus />
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard icon={FlaskConical} label="Experiments" value="04" hint="1 stable · 2 running" />
          <MetricCard icon={Activity} label="Uptime" value="99.9%" hint="last 30 days" accent="info" delay={0.05} />
          <MetricCard icon={Cpu} label="AI modules" value="02" hint="RAG · embeddings" delay={0.1} />
          <MetricCard icon={GitBranch} label="Commits / wk" value="47" hint="+12 vs last" accent="warning" delay={0.15} />
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-600">Active experiments</h2>
              <Link href="/experiments" className="font-mono text-xs text-primary hover:underline">
                view all →
              </Link>
            </div>
            <div className="grid gap-4">
              {experiments.slice(0, 2).map((experiment, index) => (
                <ExperimentCard key={experiment.id} experiment={experiment} delay={index * 0.1} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl font-600">Terminal</h2>
            <TerminalWindow />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
