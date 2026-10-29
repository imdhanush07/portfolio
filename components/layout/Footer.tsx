import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { socialLinks } from "@/data/social";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-text-tertiary">
          © {year} {profile.name}. Built with intention.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks
            .filter((link) => link.icon !== "phone")
            .map((link) => {
              const Icon = ICONS[link.icon as keyof typeof ICONS];
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-secondary transition-colors duration-150 hover:border-accent-secondary/50 hover:text-text-primary"
                >
                  <Icon size={16} />
                </a>
              );
            })}
        </div>
      </div>
    </footer>
  );
}
