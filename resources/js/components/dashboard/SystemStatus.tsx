"use client";

import { motion } from "motion/react";

const services = [
  { label: "API", state: "ONLINE", color: "text-primary", dot: "bg-primary" },
  { label: "DATABASE", state: "CONECTADO", color: "text-primary", dot: "bg-primary" },
  { label: "MODULO IA", state: "PRONTO", color: "text-info", dot: "bg-info" },
  { label: "FILA", state: "OCIOSA", color: "text-warning", dot: "bg-warning" },
] as const;

export function SystemStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="panel min-w-0 p-4 shadow-neon sm:p-5"
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <span className="mono-label">Status do sistema</span>
        <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.65rem] text-primary">
          <span className="size-1.5 rounded-full bg-primary pulse-dot" /> LIVE
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {services.map((service) => (
          <li key={service.label} className="flex min-w-0 items-center justify-between gap-3">
            <span className="flex min-w-0 items-center gap-2.5 font-mono text-xs sm:text-sm">
              <span className={`size-2 shrink-0 rounded-full ${service.dot} pulse-dot`} />
              <span className="truncate">{service.label}</span>
            </span>
            <span className={`shrink-0 font-mono text-[0.68rem] sm:text-xs ${service.color}`}>• {service.state}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 break-words border-t border-border pt-3 font-mono text-[0.68rem] text-muted-foreground sm:text-xs">
        ULTIMO DEPLOY: <span className="text-foreground">ha 2 horas</span>
      </div>
    </motion.div>
  );
}
