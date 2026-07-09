"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, Github } from "lucide-react";

const links = [
  { to: "/experiments", label: "EXPERIMENTS" },
  { to: "/knowledge", label: "KNOWLEDGE" },
  { to: "/about", label: "ABOUT" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-md border border-primary/40 bg-surface text-primary shadow-neon">
            <FlaskConical className="size-4" />
          </span>
          <span className="font-display text-lg font-700 tracking-tight">
            GEJA<span className="text-primary">LABS</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((link) => {
              const isActive = pathname === link.to || pathname.startsWith(`${link.to}/`);

              return (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className={`rounded-md px-3 py-2 font-mono text-xs tracking-widest transition-colors hover:bg-surface hover:text-foreground ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href="https://github.com/gejalabs"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-md border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Github className="size-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
