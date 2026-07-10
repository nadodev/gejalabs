import { Link } from "@inertiajs/react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="font-display font-600">
          GEJA<span className="text-primary">LABS</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> sistemas operacionais - construido no laboratorio &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="flex gap-4 font-mono text-xs text-muted-foreground">
          <Link href="/experiments" className="hover:text-foreground">
            Projetos
          </Link>
          <Link href="/knowledge" className="hover:text-foreground">
            Conhecimento
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <Link href="/about" className="hover:text-foreground">
            sobre
          </Link>
        </div>
      </div>
    </footer>
  );
}
