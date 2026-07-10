import { router } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import type { PersonalProject } from "@/types/admin";

type Line = { type: "in" | "out"; text: string };

type TerminalWindowProps = {
  projects?: Pick<PersonalProject, "slug" | "title">[] | null;
};

const HELP = [
  "available commands:",
  "  help              show this message",
  "  ls experiments    list all experiments",
  "  whoami            about the lab",
  "  open <slug>       open an experiment",
  "  clear             clear the terminal",
];

function getProjectSlugs(projects?: Pick<PersonalProject, "slug" | "title">[] | null): string[] {
  return (projects ?? []).map((project) => project.slug).filter(Boolean);
}

function buildBootLines(projects?: Pick<PersonalProject, "slug" | "title">[] | null): Line[] {
  const slugs = getProjectSlugs(projects);

  return [
    { type: "out", text: "gejalabs shell v2.0.26 - type 'help' to begin" },
    { type: "in", text: "whoami" },
    { type: "out", text: slugs.length ? slugs.join("   ") : "no published experiments" },
  ];
}

export function TerminalWindow({ projects }: TerminalWindowProps) {
  const [lines, setLines] = useState<Line[]>(() => buildBootLines(projects));
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLines(buildBootLines(projects));
  }, [projects]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  const whoami = `Meu nome é Leonardo Geja, sou desenvolvedor de software a mais de 3 anos, atualmente trabalho na
    Unoesc - Universidade do Oeste de Santa Catarina, tenho 35 anos.`;

  function run(raw: string) {
    const cmd = raw.trim();
    const next: Line[] = [...lines, { type: "in", text: cmd }];
    const [base, arg] = cmd.split(/\s+/);

    if (cmd === "") {
      /* noop */
    } else if (base === "clear") {
      setLines([]);
      return;
    } else if (base === "help") {
      HELP.forEach((text) => next.push({ type: "out", text }));
    } else if (base === "whoami") {
      next.push({ type: "out", text: whoami });
    } else if (base === "ls") {
      const slugs = getProjectSlugs(projects);
      next.push({ type: "out", text: slugs.length ? slugs.join("   ") : "no published experiments" });
    } else if (base === "open") {
      const project = (projects ?? []).find((item) => item.slug === arg);
      if (project) {
        next.push({ type: "out", text: `opening ${project.slug}...` });
        setLines(next);
        setTimeout(() => router.visit(`/experiments/${project.slug}`), 400);
        return;
      }
      next.push({ type: "out", text: `open: '${arg ?? ""}' not found` });
    } else {
      next.push({ type: "out", text: `command not found: ${base}. try 'help'` });
    }
    setLines(next);
  }

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-destructive/80" />
        <span className="size-2.5 rounded-full bg-warning/80" />
        <span className="size-2.5 rounded-full bg-primary/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">visitor@gejalabs: ~</span>
      </div>

      <div
        ref={bodyRef}
        onClick={(event) => (event.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
        className="h-72 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {lines.map((line, index) => (
          <div key={`${line.type}-${index}`} className={line.type === "in" ? "text-foreground" : "text-muted-foreground"}>
            {line.type === "in" ? <span className="text-primary">visitor@gejalabs $ </span> : null}
            <span className="whitespace-pre-wrap">{line.text}</span>
          </div>
        ))}

        <form
          onSubmit={(event) => {
            event.preventDefault();
            run(value);
            setValue("");
          }}
          className="flex items-center"
        >
          <span className="text-primary">visitor@gejalabs $&nbsp;</span>
          <input
            autoFocus
            value={value}
            onChange={(event) => setValue(event.target.value)}
            spellCheck={false}
            className="flex-1 bg-transparent text-foreground caret-primary outline-none"
            aria-label="terminal input"
          />
          <span className="caret-blink text-primary">▊</span>
        </form>
      </div>
    </div>
  );
}
