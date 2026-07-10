import { Head, Link, useForm } from "@inertiajs/react";
import { FlaskConical, LockKeyhole } from "lucide-react";

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    post("/login");
  }

  return (
    <>
      <Head title="Login" />
      <main className="grid min-h-screen place-items-center bg-background px-5 py-12 text-foreground">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
            <span className="grid size-9 place-items-center border border-primary/40 bg-surface text-primary shadow-neon">
              <FlaskConical className="size-4" />
            </span>
            <span className="font-display text-xl font-700 tracking-tight">
              GEJA<span className="text-primary">LABS</span>
            </span>
          </Link>

          <section className="panel p-6 shadow-neon">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="mono-label">// acesso admin</span>
                <h1 className="mt-2 font-display text-3xl font-700 tracking-tight">Entrar no painel</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Acesse a area administrativa para gerenciar conteudo, projetos e informacoes do site.
                </p>
              </div>
              <div className="grid size-10 shrink-0 place-items-center border border-border bg-surface text-primary">
                <LockKeyhole className="size-5" />
              </div>
            </div>

            <form onSubmit={submit} className="mt-8 space-y-5">
              <div>
                <label htmlFor="email" className="mono-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(event) => setData("email", event.target.value)}
                  className="mt-2 h-11 w-full border border-border bg-background px-3 font-mono text-sm outline-none transition-colors focus:border-primary"
                  autoComplete="email"
                  autoFocus
                />
                {errors.email ? <p className="mt-2 text-sm text-destructive">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="password" className="mono-label">
                  Senha
                </label>
                <input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(event) => setData("password", event.target.value)}
                  className="mt-2 h-11 w-full border border-border bg-background px-3 font-mono text-sm outline-none transition-colors focus:border-primary"
                  autoComplete="current-password"
                />
                {errors.password ? <p className="mt-2 text-sm text-destructive">{errors.password}</p> : null}
              </div>

              <label className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(event) => setData("remember", event.target.checked)}
                  className="size-4 border border-border bg-background accent-primary"
                />
                Manter conectado
              </label>

              <button
                type="submit"
                disabled={processing}
                className="inline-flex h-11 w-full items-center justify-center gap-2 bg-primary px-4 font-mono text-sm font-600 text-primary-foreground shadow-neon transition-opacity disabled:opacity-60"
              >
                {processing ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
