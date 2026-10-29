import { MapPin, GraduationCap, Target } from "lucide-react";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { FadeInSection } from "@/components/motion/FadeInSection";

export function About() {
  const primaryEducation = education[0];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="About"
          title="A student building toward backend and AI engineering"
        />
      </FadeInSection>

      <div className="grid gap-8 md:grid-cols-5 md:gap-12">
        <FadeInSection className="md:col-span-3">
          <p className="text-lg leading-relaxed text-text-secondary">
            {profile.summary}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-text-secondary">
            {profile.aboutExtra}
          </p>
        </FadeInSection>

        <FadeInSection delay={0.1} className="md:col-span-2">
          <GlassPanel className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <GraduationCap size={18} className="mt-0.5 shrink-0 text-accent-secondary" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {primaryEducation.degree}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {primaryEducation.institution}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target size={18} className="mt-0.5 shrink-0 text-accent-secondary" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {primaryEducation.detail}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {primaryEducation.period}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent-secondary" />
              <div>
                <p className="text-sm font-medium text-text-primary">{profile.location}</p>
                <p className="mt-0.5 text-sm text-text-secondary">Based &amp; available remotely</p>
              </div>
            </div>
          </GlassPanel>
        </FadeInSection>
      </div>
    </section>
  );
}
