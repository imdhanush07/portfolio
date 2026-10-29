import { careerGoals } from "@/data/careerGoals";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInSection } from "@/components/motion/FadeInSection";
import { cn } from "@/lib/utils";

export function CareerGoals() {
  return (
    <section id="careerGoals" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="Career Goals"
          title="Where this is headed"
          description="Full Stack today, Backend and Cloud/AI Engineering next — a deliberate progression, not a detour."
        />
      </FadeInSection>

      <div className="grid gap-5 sm:grid-cols-3">
        {careerGoals.map((goal, index) => (
          <FadeInSection key={goal.stage} delay={index * 0.1}>
            <div
              className={cn(
                "relative flex h-full flex-col gap-3 rounded-2xl border p-6",
                goal.current
                  ? "border-accent-primary/50 bg-bg-elevated shadow-[0_0_30px_-10px_var(--accent-primary)]"
                  : "border-border-subtle bg-bg-elevated/50"
              )}
            >
              <span
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.2em]",
                  goal.current ? "text-accent-secondary" : "text-text-tertiary"
                )}
              >
                {goal.stage}
              </span>
              <h3 className="text-lg font-medium text-text-primary">{goal.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {goal.description}
              </p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
