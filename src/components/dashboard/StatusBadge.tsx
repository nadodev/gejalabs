import type { ExperimentStatus } from "@/data/experiments";
import { cn } from "@/lib/utils";

const config: Record<ExperimentStatus, { label: string; color: string; text: string }> = {
  running: { label: "RUNNING", color: "bg-primary", text: "text-primary" },
  stable: { label: "STABLE", color: "bg-info", text: "text-info" },
  planned: { label: "PLANNED", color: "bg-warning", text: "text-warning" },
  failed: { label: "FAILED", color: "bg-destructive", text: "text-destructive" },
};

export function StatusBadge({ status }: { status: ExperimentStatus }) {
  const c = config[status];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-2.5 py-1 font-mono text-[0.65rem] tracking-widest">
      <span className={cn("size-1.5 rounded-full", c.color, status === "running" && "pulse-dot")} />
      <span className={c.text}>{c.label}</span>
    </span>
  );
}
