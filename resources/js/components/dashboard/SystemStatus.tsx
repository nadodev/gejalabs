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
      className="panel p-5 shadow-neon"
    >
      <div className="flex items-center justify-between">
        <span className="mono-label">Status do sistema</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-primary">
          <span className="size-1.5 rounded-full bg-primary pulse-dot" /> LIVE
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {services.map((service) => (
          <li key={service.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2.5 font-mono text-sm">
              <span className={`size-2 rounded-full ${service.dot} pulse-dot`} />
              {service.label}
            </span>
            <span className={`font-mono text-xs ${service.color}`}>● {service.state}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
        ULTIMO DEPLOY: <span className="text-foreground">ha 2 horas</span>
      </div>
    </motion.div>
  );
}
