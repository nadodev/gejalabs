export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mono-label">{label}</span>
      <div className="mt-2">{children}</div>
      {error ? <p className="mt-2 text-sm text-destructive">{error}</p> : null}
    </label>
  );
}

export const inputClass =
  "h-10 w-full border border-border bg-background px-3 font-mono text-sm outline-none transition-colors focus:border-primary";

export const textareaClass =
  "min-h-24 w-full border border-border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-primary";

export function arrayToText(value: string[] | null | undefined) {
  return value?.join("\n") ?? "";
}
