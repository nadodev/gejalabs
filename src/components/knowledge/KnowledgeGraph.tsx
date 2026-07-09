"use client";

import { motion } from "motion/react";

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  accent: "primary" | "info" | "warning";
}

const nodes: Node[] = [
  { id: "arch", label: "Architecture", x: 50, y: 50, accent: "primary" },
  { id: "laravel", label: "Laravel", x: 50, y: 14, accent: "info" },
  { id: "ddd", label: "DDD", x: 16, y: 34, accent: "primary" },
  { id: "postgres", label: "PostgreSQL", x: 84, y: 34, accent: "info" },
  { id: "redis", label: "Redis", x: 20, y: 78, accent: "warning" },
  { id: "ai", label: "AI / RAG", x: 80, y: 78, accent: "primary" },
  { id: "next", label: "Next.js", x: 50, y: 90, accent: "info" },
];

const edges: [string, string][] = [
  ["arch", "laravel"],
  ["arch", "ddd"],
  ["arch", "postgres"],
  ["arch", "redis"],
  ["arch", "ai"],
  ["arch", "next"],
  ["laravel", "postgres"],
  ["ddd", "redis"],
  ["ai", "next"],
];

const accentVar = {
  primary: "var(--primary)",
  info: "var(--info)",
  warning: "var(--warning)",
} as const;

export function KnowledgeGraph() {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="panel relative aspect-square w-full overflow-hidden p-2 sm:aspect-[4/3]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([a, b], i) => {
          const na = byId[a];
          const nb = byId[b];
          return (
            <motion.line
              key={i}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="color-mix(in oklab, var(--primary) 35%, transparent)"
              strokeWidth={0.3}
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08 }}
              style={{ animation: "dash-flow 30s linear infinite" }}
            />
          );
        })}
      </svg>

      {nodes.map((n, i) => (
        <motion.div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
        >
          <div className="flex flex-col items-center gap-1">
            <span
              className="size-3 rounded-full ring-4"
              style={{
                background: accentVar[n.accent],
                boxShadow: `0 0 12px ${accentVar[n.accent]}`,
                // @ts-expect-error css var ring
                "--tw-ring-color": "color-mix(in oklab, var(--background) 70%, transparent)",
              }}
            />
            <span className="whitespace-nowrap rounded border border-border bg-card/90 px-2 py-0.5 font-mono text-[0.6rem] sm:text-[0.7rem]">
              {n.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
