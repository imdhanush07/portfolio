export interface Profile {
  name: string;
  headline: string;
  roles: string[];
  summary: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  /** Badge text shown above your name in the hero */
  availability: string;
  /** Second paragraph in the About section */
  aboutExtra: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "phone";
}

export type SkillCategory = "Programming" | "Frontend" | "Tools" | "Languages";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface LearningItem {
  name: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  detail: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface Certification {
  title: string;
  issuer: string;
}

export interface CareerGoal {
  stage: string;
  title: string;
  description: string;
  current: boolean;
}

/** Content for a section you create from the admin panel (no code needed). */
export interface CustomSectionContent {
  eyebrow: string;
  heading: string;
  text: string;
  items: { title: string; description: string; link?: string }[];
}

export interface PortfolioSection {
  /** Unique id. Used for the #anchor in the URL. */
  id: string;
  /** Name shown in the admin panel */
  title: string;
  /** Text shown in the navigation bar */
  navLabel: string;
  /** false = hidden from the page and the navbar */
  enabled: boolean;
  /** false = visible on the page but no navbar tab */
  showInNavbar: boolean;
  /** Lower numbers appear first */
  order: number;
  /** Which component draws it. Must exist in lib/sectionRegistry.tsx */
  component: string;
  /** Only used when component is "Custom" */
  custom?: CustomSectionContent;
}

/** Shape of data/content.json - everything editable on the site. */
export interface SiteContent {
  profile: Profile;
  skills: Skill[];
  learningJourney: LearningItem[];
  projects: Project[];
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications: Certification[];
  careerGoals: CareerGoal[];
  social: SocialLink[];
  sections: PortfolioSection[];
}
