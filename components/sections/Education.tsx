import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/motion/FadeInSection";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading eyebrow="Education" title="Academic background" />
      </FadeInSection>

      <div className="flex flex-col gap-5">
        {education.map((item, index) => (
          <FadeInSection key={item.institution} delay={index * 0.08}>
            <Card className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-accent-secondary">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{item.degree}</h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {item.institution} · {item.location}
                  </p>
                </div>
              </div>
              <div className="pl-14 text-sm text-text-tertiary sm:pl-0 sm:text-right">
                <p>{item.period}</p>
                <p className="mt-1 font-mono text-accent-secondary">{item.detail}</p>
              </div>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
