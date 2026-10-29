import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { getEnabledSections } from "@/data/portfolioConfig";
import { renderSection } from "@/lib/sectionRegistry";

/**
 * PORTFOLIO HOME PAGE
 * 
 * Sections are now dynamically rendered from the centralized configuration.
 * To add/remove/reorder sections use /admin (npm run dev) or edit data/content.json
 * 
 * Do not hard-code sections here anymore.
 */
export default function Home() {
  const enabledSections = getEnabledSections();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        {enabledSections.map((section) => (
          <div key={section.id}>
            {renderSection(section)}
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
