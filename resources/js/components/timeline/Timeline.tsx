"use client";

import { motion } from "motion/react";

interface Entry {
  year: string;
  title: string;
  detail: string;
  tags?: string[];
}

export function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" />
      <ul className="space-y-8">
        {entries.map((e, i) => (
          <motion.li
            key={e.year}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-6 top-1 size-3.5 rounded-full border-2 border-primary bg-background shadow-neon" />
            <div className="font-mono text-xs text-primary">{e.year}</div>
            <div className="mt-0.5 font-display text-lg font-600">{e.title}</div>
            <p className="mt-0.5 text-sm text-muted-foreground">{e.detail}</p>
            {e.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {e.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-surface px-2 py-1 font-mono text-[0.65rem] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
