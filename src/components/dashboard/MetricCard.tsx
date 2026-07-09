"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = "primary",
  delay = 0,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  accent?: "primary" | "info" | "warning";
  delay?: number;
}) {
  const color =
    accent === "info" ? "text-info" : accent === "warning" ? "text-warning" : "text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="panel p-4"
    >
      <div className="flex items-center justify-between">
        <span className="mono-label">{label}</span>
        <Icon className={`size-4 ${color}`} />
      </div>
      <div className="mt-2 font-display text-2xl font-700">{value}</div>
      {hint && <div className="mt-0.5 font-mono text-[0.65rem] text-muted-foreground">{hint}</div>}
    </motion.div>
  );
}
