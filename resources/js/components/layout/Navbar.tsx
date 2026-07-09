import { Link, usePage } from "@inertiajs/react";
import { FlaskConical, Github } from "lucide-react";

const links = [
  { to: "/", label: "HOME", match: (url: string) => url === "/" },
  { to: "/about", label: "ABOUT", match: (url: string) => url.startsWith("/about") },
  { to: "/experiments", label: "PROJECTS", match: (url: string) => url.startsWith("/experiments") },
  { to: "/knowledge", label: "KNOWLEDGE", match: (url: string) => url.startsWith("/knowledge") },
] as const;

export function Navbar() {
  const { url } = usePage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center border border-primary/40 bg-surface text-primary shadow-neon">
            <FlaskConical className="size-4" />
          </span>
          <span className="font-display text-lg font-700 tracking-tight">
            GEJA<span className="text-primary">LABS</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = link.match(url);

              return (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className={`px-2.5 py-2 font-mono text-[0.65rem] tracking-widest transition-colors hover:bg-surface hover:text-foreground xl:px-3 ${
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
            className="grid size-9 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Github className="size-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
