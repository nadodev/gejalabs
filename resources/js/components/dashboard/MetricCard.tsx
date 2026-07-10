"use client";

import { Link } from "@inertiajs/react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = "primary",
  delay = 0,
  href,
  external = false,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  accent?: "primary" | "info" | "warning";
  delay?: number;
  href?: string;
  external?: boolean;
}) {
  const color =
    accent === "info" ? "text-info" : accent === "warning" ? "text-warning" : "text-primary";

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="panel min-w-0 p-4 transition-colors hover:border-primary/50"
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <span className="mono-label min-w-0 truncate">{label}</span>
        <Icon className={`size-4 shrink-0 ${color}`} />
      </div>
      <div className="mt-2 break-words font-display text-2xl font-700">{value}</div>
      {hint && <div className="mt-0.5 break-words font-mono text-[0.65rem] text-muted-foreground">{hint}</div>}
    </motion.div>
  );

  if (!href) {
    return content;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="block min-w-0">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label} className="block min-w-0">
      {content}
    </Link>
  );
}
