"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, ExternalLink, Save } from "lucide-react";
import { content as initialContent } from "@/data/content";
import { validateContent } from "@/lib/validateContent";
import { cn } from "@/lib/utils";
import type {
  CustomSectionContent,
  PortfolioSection,
  SiteContent,
  SkillCategory,
  SocialLink,
} from "@/types";
import {
  Field,
  ListEditor,
  Panel,
  StringListField,
  TextAreaField,
  TextField,
  Toggle,
  inputClass,
  smallButton,
} from "@/components/admin/fields";

const IS_DEV = process.env.NODE_ENV === "development";
const SKILL_CATEGORIES: SkillCategory[] = ["Programming", "Frontend", "Tools", "Languages"];
const SOCIAL_ICONS: SocialLink["icon"][] = ["github", "linkedin", "mail", "phone"];

const TABS = [
  { key: "sections", label: "Sections & Tabs" },
  { key: "profile", label: "Profile" },
  { key: "skills", label: "Skills" },
  { key: "learningJourney", label: "Learning Journey" },
  { key: "projects", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "certifications", label: "Certifications" },
  { key: "careerGoals", label: "Career Goals" },
  { key: "social", label: "Social Links" },
] as const;
type TabKey = (typeof TABS)[number]["key"];

function normalize(content: SiteContent): SiteContent {
  const sections = [...content.sections]
    .sort((a, b) => a.order - b.order)
    .map((s, index) => ({ ...s, order: index }));
  return { ...content, sections };
}

const slug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "");

export default function AdminPage() {
  const [draft, setDraft] = useState<SiteContent>(() => normalize(initialContent));
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(normalize(initialContent)));
  const [tab, setTab] = useState<TabKey>("sections");
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(() => JSON.stringify(draft) !== savedJson, [draft, savedJson]);
  const problems = useMemo(() => validateContent(draft), [draft]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const save = async () => {
    if (problems.length) {
      setStatus({ kind: "error", text: problems.join(" ") });
      return;
    }
    setSaving(true);
    setStatus(null);
    try {
      const next = normalize(draft);
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data: { error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      setDraft(next);
      setSavedJson(JSON.stringify(next));
      setStatus({ kind: "ok", text: "Saved to data/content.json. Your site has updated." });
    } catch (error) {
      setStatus({ kind: "error", text: error instanceof Error ? error.message : "Save failed." });
    } finally {
      setSaving(false);
    }
  };

  const download = () => {
    const blob = new Blob([JSON.stringify(normalize(draft), null, 2) + "\n"], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadAvatar = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data: { path?: string; error?: string } = await res.json();
      if (!res.ok || !data.path) throw new Error(data.error ?? "Upload failed.");
      set("profile", { ...draft.profile, avatar: data.path });
      setStatus({ kind: "ok", text: "Image uploaded. Remember to press Save." });
    } catch (error) {
      setStatus({ kind: "error", text: error instanceof Error ? error.message : "Upload failed." });
    }
  };

  /* ---------- Sections tab ---------- */
  const sectionsTab = (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-text-secondary">
        Use the arrows to reorder. Turn <strong>Show on page</strong> off to hide a section completely. Turn{" "}
        <strong>Navbar tab</strong> off to keep it on the page without a tab.
      </p>
      <ListEditor<PortfolioSection>
        items={draft.sections}
        onChange={(items) => set("sections", items)}
        addLabel="Add a new section (tab)"
        itemTitle={(s) => `${s.title} ${s.component === "Custom" ? "· custom" : ""}`}
        newItem={() => ({
          id: `section-${Date.now().toString(36)}`,
          title: "New Section",
          navLabel: "New",
          enabled: true,
          showInNavbar: true,
          order: draft.sections.length,
          component: "Custom",
          custom: { eyebrow: "New", heading: "My new section", text: "", items: [] },
        })}
        render={(section, update) => (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Tab name (shown in navbar)" value={section.navLabel} onChange={(v) => update({ navLabel: v })} />
              <TextField label="Section name (for this editor)" value={section.title} onChange={(v) => update({ title: v })} />
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Toggle label="Show on page" checked={section.enabled} onChange={(v) => update({ enabled: v })} />
              <Toggle label="Navbar tab" checked={section.showInNavbar} onChange={(v) => update({ showInNavbar: v })} />
            </div>
            {section.component === "Custom" && (
              <>
                <TextField
                  label="Link id (the #part of the web address)"
                  value={section.id}
                  hint="Letters, numbers and dashes only. Must be unique."
                  onChange={(v) => update({ id: slug(v) })}
                />
                <CustomEditor
                  value={section.custom ?? { eyebrow: "", heading: "", text: "", items: [] }}
                  onChange={(custom) => update({ custom })}
                />
              </>
            )}
            {section.component !== "Custom" && (
              <p className="text-xs text-text-tertiary">
                Built-in section ({section.component}). Edit its content in the other tabs.
              </p>
            )}
          </div>
        )}
      />
    </div>
  );

  /* ---------- Other tabs ---------- */
  const tabs: Record<TabKey, React.ReactNode> = {
    sections: sectionsTab,

    profile: (
      <div className="flex flex-col gap-4">
        <Panel title="Basics">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Full name" value={draft.profile.name} onChange={(v) => set("profile", { ...draft.profile, name: v })} />
            <TextField label="Headline" value={draft.profile.headline} onChange={(v) => set("profile", { ...draft.profile, headline: v })} />
            <TextField label="Location" value={draft.profile.location} onChange={(v) => set("profile", { ...draft.profile, location: v })} />
            <TextField label="Hero badge text" value={draft.profile.availability} onChange={(v) => set("profile", { ...draft.profile, availability: v })} />
            <TextField label="Email" value={draft.profile.email} onChange={(v) => set("profile", { ...draft.profile, email: v })} />
            <TextField label="Phone" value={draft.profile.phone} onChange={(v) => set("profile", { ...draft.profile, phone: v })} />
          </div>
        </Panel>
        <Panel title="Text">
          <div className="flex flex-col gap-4">
            <StringListField
              label="Rotating roles (one per line)"
              separator={"\n"}
              value={draft.profile.roles}
              onChange={(v) => set("profile", { ...draft.profile, roles: v })}
            />
            <TextAreaField label="Bio / summary" rows={4} value={draft.profile.summary} onChange={(v) => set("profile", { ...draft.profile, summary: v })} />
            <TextAreaField label="About section - second paragraph" rows={3} value={draft.profile.aboutExtra} onChange={(v) => set("profile", { ...draft.profile, aboutExtra: v })} />
          </div>
        </Panel>
        <Panel title="Profile photo">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={draft.profile.avatar} alt="Current profile" className="h-20 w-20 rounded-full border border-border-subtle object-cover" />
            <div className="flex-1">
              <TextField label="Image path" value={draft.profile.avatar} onChange={(v) => set("profile", { ...draft.profile, avatar: v })} hint="Files in the public/ folder, e.g. /profile.png" />
            </div>
            <Field label="Upload new (PNG, JPG, WebP)">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={!IS_DEV}
                className="text-xs text-text-secondary"
                onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])}
              />
            </Field>
          </div>
        </Panel>
      </div>
    ),

    skills: (
      <ListEditor
        items={draft.skills}
        onChange={(v) => set("skills", v)}
        addLabel="Add skill"
        itemTitle={(s) => s.name}
        newItem={() => ({ name: "", category: "Tools" as SkillCategory })}
        render={(s, update) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Skill" value={s.name} onChange={(v) => update({ name: v })} />
            <Field label="Group">
              <select className={inputClass} value={s.category} onChange={(e) => update({ category: e.target.value as SkillCategory })}>
                {SKILL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>
        )}
      />
    ),

    learningJourney: (
      <ListEditor
        items={draft.learningJourney}
        onChange={(v) => set("learningJourney", v)}
        addLabel="Add topic"
        itemTitle={(i) => i.name}
        newItem={() => ({ name: "", description: "" })}
        render={(i, update) => (
          <div className="flex flex-col gap-4">
            <TextField label="Topic" value={i.name} onChange={(v) => update({ name: v })} />
            <TextAreaField label="Description" value={i.description} onChange={(v) => update({ description: v })} />
          </div>
        )}
      />
    ),

    projects: (
      <ListEditor
        items={draft.projects}
        onChange={(v) => set("projects", v)}
        addLabel="Add project"
        itemTitle={(p) => p.title}
        newItem={() => ({ title: "", description: "", stack: [], featured: false })}
        render={(p, update) => (
          <div className="flex flex-col gap-4">
            <TextField label="Title" value={p.title} onChange={(v) => update({ title: v })} />
            <TextAreaField label="Description" rows={3} value={p.description} onChange={(v) => update({ description: v })} />
            <StringListField label="Technologies (comma separated)" separator="," value={p.stack} onChange={(v) => update({ stack: v })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Live demo link" placeholder="https://..." value={p.href ?? ""} onChange={(v) => update({ href: v || undefined })} />
              <TextField label="GitHub repo link" placeholder="https://github.com/..." value={p.repo ?? ""} onChange={(v) => update({ repo: v || undefined })} />
            </div>
            <Toggle label="Featured project" checked={Boolean(p.featured)} onChange={(v) => update({ featured: v })} />
          </div>
        )}
      />
    ),

    education: (
      <ListEditor
        items={draft.education}
        onChange={(v) => set("education", v)}
        addLabel="Add education"
        itemTitle={(e) => e.degree}
        newItem={() => ({ degree: "", institution: "", location: "", period: "", detail: "" })}
        render={(e, update) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Degree" value={e.degree} onChange={(v) => update({ degree: v })} />
            <TextField label="Institution" value={e.institution} onChange={(v) => update({ institution: v })} />
            <TextField label="Location" value={e.location} onChange={(v) => update({ location: v })} />
            <TextField label="Period" value={e.period} onChange={(v) => update({ period: v })} />
            <TextField label="Detail (e.g. CGPA)" value={e.detail} onChange={(v) => update({ detail: v })} />
          </div>
        )}
      />
    ),

    experience: (
      <ListEditor
        items={draft.experience}
        onChange={(v) => set("experience", v)}
        addLabel="Add experience / internship"
        itemTitle={(e) => `${e.role} ${e.organization ? "· " + e.organization : ""}`}
        newItem={() => ({ role: "", organization: "", period: "", description: "" })}
        render={(e, update) => (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField label="Role" value={e.role} onChange={(v) => update({ role: v })} />
              <TextField label="Organization" value={e.organization} onChange={(v) => update({ organization: v })} />
              <TextField label="Period" value={e.period} onChange={(v) => update({ period: v })} />
            </div>
            <TextAreaField label="Description" value={e.description} onChange={(v) => update({ description: v })} />
          </div>
        )}
      />
    ),

    certifications: (
      <ListEditor
        items={draft.certifications}
        onChange={(v) => set("certifications", v)}
        addLabel="Add certification"
        itemTitle={(c) => c.title}
        newItem={() => ({ title: "", issuer: "" })}
        render={(c, update) => (
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Title" value={c.title} onChange={(v) => update({ title: v })} />
            <TextField label="Issuer" value={c.issuer} onChange={(v) => update({ issuer: v })} />
          </div>
        )}
      />
    ),

    careerGoals: (
      <ListEditor
        items={draft.careerGoals}
        onChange={(v) => set("careerGoals", v)}
        addLabel="Add goal"
        itemTitle={(g) => `${g.stage}: ${g.title}`}
        newItem={() => ({ stage: "", title: "", description: "", current: false })}
        render={(g, update) => (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Stage label (e.g. Now, Next)" value={g.stage} onChange={(v) => update({ stage: v })} />
              <TextField label="Title" value={g.title} onChange={(v) => update({ title: v })} />
            </div>
            <TextAreaField label="Description" value={g.description} onChange={(v) => update({ description: v })} />
            <Toggle label="Highlight as current stage" checked={g.current} onChange={(v) => update({ current: v })} />
          </div>
        )}
      />
    ),

    social: (
      <ListEditor
        items={draft.social}
        onChange={(v) => set("social", v)}
        addLabel="Add link"
        itemTitle={(s) => s.label}
        newItem={() => ({ label: "", href: "", icon: "github" as SocialLink["icon"] })}
        render={(s, update) => (
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField label="Label" value={s.label} onChange={(v) => update({ label: v })} />
            <TextField label="Link" value={s.href} hint="https://..., mailto:..., tel:..." onChange={(v) => update({ href: v })} />
            <Field label="Icon">
              <select className={inputClass} value={s.icon} onChange={(e) => update({ icon: e.target.value as SocialLink["icon"] })}>
                {SOCIAL_ICONS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </Field>
          </div>
        )}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <header className="sticky top-0 z-30 border-b border-border-subtle bg-bg-base/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold">Portfolio Editor</h1>
            <p className="text-xs text-text-tertiary">
              {dirty ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className={smallButton}>
              <ExternalLink size={13} /> View site
            </Link>
            <button type="button" onClick={download} className={smallButton}>
              <Download size={13} /> Export JSON
            </button>
            <button
              type="button"
              onClick={save}
              disabled={!IS_DEV || !dirty || saving}
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save size={14} /> {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {!IS_DEV && (
          <div className="mb-6 rounded-lg border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Saving is disabled here. Edit your portfolio on your own computer: run <code>npm run dev</code>, open{" "}
            <code>http://localhost:3000/admin</code>, then deploy the updated <code>data/content.json</code>.
          </div>
        )}
        {status && (
          <div
            role="status"
            className={cn(
              "mb-6 rounded-lg border p-4 text-sm",
              status.kind === "ok"
                ? "border-green-500/40 bg-green-500/10 text-green-200"
                : "border-red-500/40 bg-red-500/10 text-red-200"
            )}
          >
            {status.text}
          </div>
        )}
        {problems.length > 0 && (
          <div className="mb-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
            Fix before saving: {problems.join(" ")}
          </div>
        )}

        <nav aria-label="Editor sections" className="mb-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-current={tab === t.key ? "page" : undefined}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                tab === t.key
                  ? "border-accent-primary bg-accent-primary/15 text-text-primary"
                  : "border-border-subtle text-text-secondary hover:text-text-primary"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tabs[tab]}
      </main>
    </div>
  );
}

function CustomEditor({ value, onChange }: { value: CustomSectionContent; onChange: (v: CustomSectionContent) => void }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-border-subtle p-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Small label above heading" value={value.eyebrow} onChange={(v) => onChange({ ...value, eyebrow: v })} />
        <TextField label="Heading" value={value.heading} onChange={(v) => onChange({ ...value, heading: v })} />
      </div>
      <TextAreaField label="Paragraph" rows={4} value={value.text} onChange={(v) => onChange({ ...value, text: v })} />
      <div>
        <p className="mb-2 text-xs font-medium text-text-secondary">Cards (optional)</p>
        <ListEditor
          items={value.items}
          onChange={(items) => onChange({ ...value, items })}
          addLabel="Add card"
          itemTitle={(i) => i.title}
          newItem={() => ({ title: "", description: "", link: "" })}
          render={(i, update) => (
            <div className="flex flex-col gap-4">
              <TextField label="Title" value={i.title} onChange={(v) => update({ title: v })} />
              <TextAreaField label="Description" value={i.description} onChange={(v) => update({ description: v })} />
              <TextField label="Link (optional)" value={i.link ?? ""} onChange={(v) => update({ link: v || undefined })} />
            </div>
          )}
        />
      </div>
    </div>
  );
}
