/**
 * SECTION HELPERS
 *
 * The list of sections (order, names, visibility) lives in data/content.json
 * under "sections" and is edited from /admin -> Sections.
 *
 *   enabled: false       -> hidden from page AND navbar
 *   showInNavbar: false  -> on the page, but no navbar tab
 *   navLabel: "My Work"  -> renames the navbar tab
 *   order                -> lower numbers come first
 */
import type { PortfolioSection } from "@/types";
import { content } from "./content";

export const portfolioSections: PortfolioSection[] = content.sections;

export function getEnabledSections(
  sections: PortfolioSection[] = portfolioSections
): PortfolioSection[] {
  return sections.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
}

export function getNavbarSections(
  sections: PortfolioSection[] = portfolioSections
): PortfolioSection[] {
  return getEnabledSections(sections).filter((s) => s.showInNavbar);
}
