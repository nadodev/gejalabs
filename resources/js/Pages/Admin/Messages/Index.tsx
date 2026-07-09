import { router } from "@inertiajs/react";
import { AdminLayout } from "@/Layouts/AdminLayout";
import type { ContactMessage } from "@/types/admin";

interface Props {
  messages: ContactMessage[];
}

export default function MessagesIndex({ messages }: Props) {
  return (
    <AdminLayout title="Mensagens" eyebrow="// inbox">
      <section className="panel p-5">
        <span className="mono-label">received</span>
        <h1 className="mt-1 font-display text-2xl font-600">Contatos do site</h1>
        <div className="mt-6 grid gap-4">
          {messages.length ? (
            messages.map((message) => (
              <article key={message.id} className="border border-border bg-surface/30 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-display text-lg font-600">{message.subject || "Sem assunto"}</div>
                    <div className="mt-1 font-mono text-xs text-muted-foreground">{message.name} · {message.email}</div>
                  </div>
                  <span className={`border px-2.5 py-1 font-mono text-[0.65rem] ${message.read_at ? "border-border text-muted-foreground" : "border-primary text-primary"}`}>
                    {message.read_at ? "lida" : "nova"}
                  </span>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{message.message}</p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => router.patch(`/admin/messages/${message.id}`)} className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground">
                    {message.read_at ? "marcar como nova" : "marcar como lida"}
                  </button>
                  <button onClick={() => router.delete(`/admin/messages/${message.id}`)} className="border border-destructive/50 bg-background px-3 py-2 font-mono text-xs text-destructive">
                    excluir
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma mensagem recebida ainda.</p>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}
