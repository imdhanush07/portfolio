import { Code2 } from "lucide-react";
import { learningJourney } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { FadeInSection } from "@/components/motion/FadeInSection";

export function LearningJourney() {
  return (
    <section id="journey" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="Currently Learning"
          title="Learning journey"
          description="What I'm actively building toward right now — the path from full stack fundamentals to backend depth."
        />
      </FadeInSection>

      <FadeInSection delay={0.1} className="max-w-2xl">
        <div>
          {learningJourney.map((item, index) => (
            <TimelineItem
              key={item.name}
              title={item.name}
              description={item.description}
              isLast={index === learningJourney.length - 1}
              icon={<Code2 size={14} />}
            />
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
