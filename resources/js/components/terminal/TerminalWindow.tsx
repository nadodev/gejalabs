import { router } from "@inertiajs/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { PersonalProject } from "@/types/admin";

type Line = { type: "in" | "out"; text: string };

type TerminalWindowProps = {
  projects?: Pick<PersonalProject, "slug" | "title">[] | null;
};


  const whoami = `My name is Leonardo Geja. I am a software developer with over three years of experience, currently working at Unoesc — the University of Western Santa Catarina. I am 35 years old and focused on building reliable, maintainable, and well-structured software solutions.`;

const HELP = [
  "available commands:",
  "  help              show this message",
  "  ls experiments    list all experiments",
  "  whoami            about the Geja",
  "  cd <slug>         open an experiment",
  "  resume            download the curriculum vitae",
  "  clear             clear the terminal",
  "  ctrl+l            clear screen",
];

const COMMAND_SUGGESTIONS = ["help", "whoami", "resume", "clear", "ls experiments", "cd <slug>"];

function getProjectSlugs(projects?: Pick<PersonalProject, "slug" | "title">[] | null): string[] {
  return (projects ?? []).map((project) => project.slug).filter(Boolean);
}

function getSuggestions(value: string, projects?: Pick<PersonalProject, "slug" | "title">[] | null): string[] {
  const trimmed = value.trim();
  if (trimmed === "/") {
    return COMMAND_SUGGESTIONS;
  }

  if (trimmed.startsWith("/")) {
    const query = trimmed.slice(1).toLowerCase();
    return COMMAND_SUGGESTIONS.filter((item) => item.toLowerCase().includes(query));
  }

  if (trimmed.startsWith("ls")) {
    return ["ls experiments"].filter((item) => item.toLowerCase().includes(trimmed.toLowerCase()));
  }

  if (trimmed.startsWith("cd")) {
    const slugPrefix = trimmed.replace(/^cd\s*/i, "");
    const matchingSlugs = getProjectSlugs(projects).filter((slug) => slug.toLowerCase().startsWith(slugPrefix.toLowerCase()));
    return matchingSlugs.length ? matchingSlugs.map((slug) => `cd ${slug}`) : getProjectSlugs(projects).map((slug) => `cd ${slug}`);
  }

  return COMMAND_SUGGESTIONS.filter((item) => item.toLowerCase().startsWith(trimmed.toLowerCase()));
}

function completeInput(value: string, projects?: Pick<PersonalProject, "slug" | "title">[] | null): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return value;
  }

  if (trimmed.startsWith("/")) {
    const query = trimmed.slice(1).toLowerCase();
    const match = COMMAND_SUGGESTIONS.find((item) => item.toLowerCase().startsWith(query));
    return match ? `/${match}` : value;
  }

  if (trimmed.startsWith("ls")) {
    return "ls experiments";
  }

  if (trimmed.startsWith("cd")) {
    const slugPrefix = trimmed.replace(/^cd\s*/i, "");
    const matchingSlugs = getProjectSlugs(projects).filter((slug) => slug.toLowerCase().startsWith(slugPrefix.toLowerCase()));
    if (matchingSlugs.length) {
      return `cd ${matchingSlugs[0]}`;
    }
  }

  const match = COMMAND_SUGGESTIONS.find((item) => item.toLowerCase().startsWith(trimmed.toLowerCase()));
  return match ?? value;
}

function buildBootLines(projects?: Pick<PersonalProject, "slug" | "title">[] | null): Line[] {
  const slugs = getProjectSlugs(projects);

  return [
    { type: "out", text: "gejalabs shell v2.0.26 - type 'help' to begin" },
    { type: "in", text: "whoami" },
    { type: "out", text: whoami },
  ];
}

export function TerminalWindow({ projects }: TerminalWindowProps) {
  const [lines, setLines] = useState<Line[]>(() => buildBootLines(projects));
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const suggestions = useMemo(() => getSuggestions(value, projects), [value, projects]);

  useEffect(() => {
    setLines(buildBootLines(projects));
  }, [projects]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);


  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setLines([]);
      setValue("");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const completed = completeInput(value, projects);
      if (completed) {
        setValue(completed);
      }
    }
  }

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
    } else if (base === "resume") {
      next.push({ type: "out", text: "downloading resume..." });
      setLines(next);
      const resumeUrl = "https://gejalabs.com.br/storage/resumes/qknsHHDVKZjw4k43BZtqJvYkg1aqwhvc9WhgwvNN.pdf";
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
      return;
    } else if (base === "ls") {
      const slugs = getProjectSlugs(projects);
      next.push({ type: "out", text: slugs.length ? slugs.join("   ") : "no published experiments" });
    } else if (base === "cd") {
      const project = (projects ?? []).find((item) => item.slug === arg);
      if (project) {
        next.push({ type: "out", text: `changing to ${project.slug}...` });
        setLines(next);
        setTimeout(() => router.visit(`/experiments/${project.slug}`), 400);
        return;
      }
      next.push({ type: "out", text: `cd: '${arg ?? ""}' not found` });
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
          className="flex flex-col"
        >
          <div className="flex items-center">
            <span className="text-primary">visitor@gejalabs $&nbsp;</span>
            <input
              autoFocus
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 bg-transparent text-foreground caret-primary outline-none"
              aria-label="terminal input"
            />
            <span className="caret-blink text-primary">▊</span>
          </div>

          {value === "/" || value.startsWith("/") ? (
            <div className="mt-2 flex flex-wrap gap-2 border-t border-border/60 pt-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setValue(suggestion);
                  }}
                  className="rounded border border-border/70 bg-surface/60 px-2 py-1 font-mono text-[0.7rem] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
