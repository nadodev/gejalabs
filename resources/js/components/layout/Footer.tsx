import { Link } from "@inertiajs/react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="font-display font-600">
          GEJA<span className="text-primary">LABS</span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-primary">$</span> systems operational - built in the lab ©{" "}
          {new Date().getFullYear()}
        </p>
        <div className="flex gap-4 font-mono text-xs text-muted-foreground">
          <Link href="/experiments?tab=professional" className="hover:text-foreground">
            profissionais
          </Link>
          <Link href="/experiments?tab=personal" className="hover:text-foreground">
            pessoais
          </Link>
          <Link href="/knowledge" className="hover:text-foreground">
            laboratório
          </Link>
          <Link href="/about" className="hover:text-foreground">
            sobre
          </Link>
          <Link href="/login" className="hover:text-foreground">
            admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
