import { Award } from "lucide-react";
import { certifications } from "@/data/certifications";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/motion/FadeInSection";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading eyebrow="Certifications" title="Credentials" />
      </FadeInSection>

      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((cert, index) => (
          <FadeInSection key={cert.title} delay={index * 0.08}>
            <Card className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-subtle text-accent-secondary">
                <Award size={18} />
              </div>
              <div>
                <h3 className="font-medium text-text-primary">{cert.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
              </div>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
