import { Briefcase } from "lucide-react";
import { experience } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/motion/FadeInSection";

export function Internship() {
  return (
    <section id="internship" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading eyebrow="Experience" title="Internship" />
      </FadeInSection>

      <div className="flex flex-col gap-5">
        {experience.map((item, index) => (
          <FadeInSection key={item.organization} delay={index * 0.08}>
            <Card className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-accent-secondary">
                <Briefcase size={18} />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">
                  {item.role} · {item.organization}
                </h3>
                <p className="mt-1 font-mono text-xs text-text-tertiary">{item.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
