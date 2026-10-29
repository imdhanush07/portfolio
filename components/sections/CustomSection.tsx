import type { PortfolioSection } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeInSection } from "@/components/motion/FadeInSection";

/**
 * Generic section for tabs created from /admin.
 * Shows a heading, a paragraph, and an optional grid of cards.
 */
export function CustomSection({ section }: { section: PortfolioSection }) {
  const custom = section.custom;
  if (!custom) return null;

  return (
    <section id={section.id} className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow={custom.eyebrow || section.title}
          title={custom.heading || section.title}
        />
      </FadeInSection>

      {custom.text && (
        <FadeInSection>
          <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-text-secondary">
            {custom.text}
          </p>
        </FadeInSection>
      )}

      {custom.items.length > 0 && (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {custom.items.map((item, index) => (
            <FadeInSection key={`${item.title}-${index}`} delay={index * 0.05}>
              <GlassPanel className="flex h-full flex-col gap-2">
                <h3 className="text-lg font-medium text-text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-2 text-sm text-accent-secondary hover:underline"
                  >
                    Open link
                  </a>
                )}
              </GlassPanel>
            </FadeInSection>
          ))}
        </div>
      )}
    </section>
  );
}
