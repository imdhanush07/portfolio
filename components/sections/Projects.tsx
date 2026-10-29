import { Github, ExternalLink, Plus } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { FadeInSection } from "@/components/motion/FadeInSection";

const PLACEHOLDER_SLOTS = 2;

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Applied practice — turning coursework and self-driven learning into working software."
        />
      </FadeInSection>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <FadeInSection key={project.title} delay={index * 0.08}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-text-primary">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>
              </div>

              <div className="mt-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border-subtle px-3 py-1 font-mono text-xs text-text-tertiary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.repo || project.href) && (
                  <div className="flex gap-4">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
                      >
                        <Github size={14} /> Code
                      </a>
                    )}
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors duration-150 hover:text-text-primary"
                      >
                        <ExternalLink size={14} /> Live
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </FadeInSection>
        ))}

        {Array.from({ length: PLACEHOLDER_SLOTS }).map((_, index) => (
          <FadeInSection key={`placeholder-${index}`} delay={(projects.length + index) * 0.08}>
            <Card
              hoverable={false}
              className="flex h-full min-h-[220px] flex-col items-center justify-center border-dashed text-center"
            >
              <Plus size={20} className="mb-3 text-text-tertiary" />
              <p className="text-sm text-text-tertiary">More projects coming soon</p>
            </Card>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
