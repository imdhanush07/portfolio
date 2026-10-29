/**
 * SECTION REGISTRY
 *
 * Maps the "component" name used in data/content.json to a real React component.
 * Only needed when you write a NEW coded section:
 *   1. create components/sections/MySection.tsx
 *   2. import it below and add it to the registry
 *   3. add a section entry (component: "MySection") in /admin -> Sections or content.json
 *
 * Sections made from the admin panel use "Custom" and need none of this.
 */
import type { ComponentType } from "react";
import type { PortfolioSection } from "@/types";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Internship } from "@/components/sections/Internship";
import { Certifications } from "@/components/sections/Certifications";
import { GithubHighlights } from "@/components/sections/GithubHighlights";
import { CareerGoals } from "@/components/sections/CareerGoals";
import { Contact } from "@/components/sections/Contact";
import { CustomSection } from "@/components/sections/CustomSection";

type SectionComponent = ComponentType<{ section: PortfolioSection }>;

export const sectionRegistry: Record<string, SectionComponent> = {
  Hero,
  About,
  Skills,
  LearningJourney,
  Projects,
  Education,
  Internship,
  Certifications,
  GithubHighlights,
  CareerGoals,
  Contact,
  Custom: CustomSection,
};

export function renderSection(section: PortfolioSection) {
  const Component = sectionRegistry[section.component];
  if (!Component) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[portfolio] Section "${section.id}" uses unknown component "${section.component}". Add it to lib/sectionRegistry.tsx.`
      );
    }
    return null;
  }
  return <Component section={section} />;
}
