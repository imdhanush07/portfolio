import { skills } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { FadeInSection } from "@/components/motion/FadeInSection";

const CATEGORY_ORDER: SkillCategory[] = ["Programming", "Frontend", "Tools", "Languages"];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="Skills"
          title="Technical foundation"
          description="A practical toolkit built through coursework and self-driven projects, grouped by where I use it."
        />
      </FadeInSection>

      <div className="flex flex-col gap-10">
        {CATEGORY_ORDER.map((category, index) => {
          const items = skills.filter((skill) => skill.category === category);
          if (items.length === 0) return null;

          return (
            <FadeInSection key={category} delay={index * 0.05}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-text-tertiary">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <SkillBadge key={skill.name} name={skill.name} />
                ))}
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </section>
  );
}
