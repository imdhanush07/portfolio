export interface Profile {
  name: string;
  headline: string;
  roles: string[];
  summary: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
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
