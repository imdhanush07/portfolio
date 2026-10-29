"use client";

import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-lg border border-border-subtle bg-bg-base px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-secondary focus:outline-none";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      {children}
      {hint && <span className="text-xs text-text-tertiary">{hint}</span>}
    </label>
  );
}

export function TextField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <Field label={props.label} hint={props.hint}>
      <input
        className={inputClass}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Field>
  );
}

export function TextAreaField(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <Field label={props.label} hint={props.hint}>
      <textarea
        className={cn(inputClass, "resize-y leading-relaxed")}
        rows={props.rows ?? 3}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </Field>
  );
}

/** Edits a list of short strings typed as one text box (comma or one-per-line). */
export function StringListField(props: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  separator: "," | "\n";
  hint?: string;
}) {
  const { separator } = props;
  // While typing, keep the raw text so spaces and trailing commas are not eaten.
  const [raw, setRaw] = useState<string | null>(null);
  const shown = raw ?? props.value.join(separator === "," ? ", " : "\n");
  const parse = (text: string) => text.split(separator).map((v) => v.trim()).filter(Boolean);

  const handle = (text: string) => {
    setRaw(text);
    props.onChange(parse(text));
  };

  return separator === "\n" ? (
    <Field label={props.label} hint={props.hint}>
      <textarea
        className={cn(inputClass, "resize-y")}
        rows={Math.max(3, props.value.length + 1)}
        value={shown}
        onChange={(e) => handle(e.target.value)}
        onBlur={() => setRaw(null)}
      />
    </Field>
  ) : (
    <Field label={props.label} hint={props.hint}>
      <input
        className={inputClass}
        value={shown}
        onChange={(e) => handle(e.target.value)}
        onBlur={() => setRaw(null)}
      />
    </Field>
  );
}

export function Toggle(props: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
      <input
        type="checkbox"
        className="h-4 w-4 accent-[var(--accent-primary)]"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      {props.label}
    </label>
  );
}

export function Panel({ title, children, action }: { title?: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-bg-elevated p-5">
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h3 className="text-sm font-semibold text-text-primary">{title}</h3>}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export const smallButton =
  "inline-flex items-center gap-1.5 rounded-lg border border-border-subtle px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent-secondary/50 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40";

/** Reorderable list with add / remove / move up / move down. */
export function ListEditor<T>(props: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  itemTitle: (item: T, index: number) => string;
  addLabel: string;
  render: (item: T, update: (patch: Partial<T>) => void, index: number) => ReactNode;
  emptyText?: string;
}) {
  const { items, onChange } = props;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 && (
        <p className="text-sm text-text-tertiary">{props.emptyText ?? "Nothing here yet."}</p>
      )}
      {items.map((item, index) => (
        <Panel
          key={index}
          title={props.itemTitle(item, index) || `Item ${index + 1}`}
          action={
            <div className="flex items-center gap-1.5">
              <button type="button" className={smallButton} aria-label="Move up" disabled={index === 0} onClick={() => move(index, index - 1)}>
                <ArrowUp size={13} />
              </button>
              <button type="button" className={smallButton} aria-label="Move down" disabled={index === items.length - 1} onClick={() => move(index, index + 1)}>
                <ArrowDown size={13} />
              </button>
              <button
                type="button"
                className={cn(smallButton, "hover:!border-red-500/50 hover:!text-red-400")}
                aria-label="Remove"
                onClick={() => {
                  if (window.confirm("Remove this item?")) onChange(items.filter((_, i) => i !== index));
                }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          }
        >
          {props.render(item, (patch) => onChange(items.map((it, i) => (i === index ? { ...it, ...patch } : it))), index)}
        </Panel>
      ))}
      <div>
        <button type="button" className={cn(smallButton, "px-3 py-2 text-sm")} onClick={() => onChange([...items, props.newItem()])}>
          <Plus size={14} /> {props.addLabel}
        </button>
      </div>
    </div>
  );
}
