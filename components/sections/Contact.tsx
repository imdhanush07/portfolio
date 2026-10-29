import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeInSection } from "@/components/motion/FadeInSection";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  phone: Phone,
};

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          description={`Open to Full Stack and Backend opportunities. Based in ${profile.location} — reachable anywhere.`}
          align="center"
        />
      </FadeInSection>

      <FadeInSection delay={0.1} className="flex flex-col items-center gap-8">
        <Button href={`mailto:${profile.email}`} variant="primary" icon={<Mail size={16} />}>
          {profile.email}
        </Button>

        <div className="flex items-center gap-4">
          {socialLinks
            .filter((link) => link.icon !== "mail")
            .map((link) => {
              const Icon = ICONS[link.icon];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-secondary/50 hover:text-text-primary"
                >
                  <Icon size={18} />
                </a>
              );
            })}
        </div>
      </FadeInSection>
    </section>
  );
}
