import type { SiteContent } from "@/types";

const ARRAY_KEYS = [
  "skills",
  "learningJourney",
  "projects",
  "education",
  "experience",
  "certifications",
  "careerGoals",
  "social",
  "sections",
] as const;

/** Returns a list of human-readable problems. Empty list = valid. */
export function validateContent(value: unknown): string[] {
  const errors: string[] = [];
  if (typeof value !== "object" || value === null) return ["Content must be an object."];
  const c = value as Partial<SiteContent>;

  if (typeof c.profile !== "object" || c.profile === null) errors.push("Profile is missing.");
  else if (!c.profile.name?.trim()) errors.push("Profile: name cannot be empty.");

  for (const key of ARRAY_KEYS) {
    if (!Array.isArray(c[key])) errors.push(`"${key}" must be a list.`);
  }
  if (errors.length) return errors;

  const ids = new Set<string>();
  for (const s of c.sections!) {
    if (!/^[a-z0-9][a-z0-9-]*$/i.test(s.id ?? "")) {
      errors.push(`Section "${s.title}": id must use letters, numbers and dashes only.`);
    } else if (ids.has(s.id) || s.id === "top") {
      errors.push(`Section id "${s.id}" is used twice.`);
    }
    ids.add(s.id);
    if (!s.navLabel?.trim()) errors.push(`Section "${s.title}": tab name cannot be empty.`);
    if (typeof s.component !== "string" || !s.component) {
      errors.push(`Section "${s.title}": missing component.`);
    }
  }
  return errors;
}
