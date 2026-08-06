import { Star, GitFork, ExternalLink, Github } from "lucide-react";
import { socialLinks } from "@/data/social";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeInSection } from "@/components/motion/FadeInSection";

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const GITHUB_USERNAME = "imdhanush07";

async function getRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: GithubRepo[] = await res.json();
    return data.filter((repo) => !repo.name.includes(GITHUB_USERNAME)).slice(0, 4);
  } catch {
    return [];
  }
}

export async function GithubHighlights() {
  const repos = await getRepos();
  const githubUrl = socialLinks.find((link) => link.icon === "github")?.href ?? "#";

  return (
    <section id="github" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <FadeInSection>
        <SectionHeading
          eyebrow="GitHub"
          title="Recent activity"
          description="A live look at what I've been working on."
        />
      </FadeInSection>

      {repos.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          {repos.map((repo, index) => (
            <FadeInSection key={repo.id} delay={index * 0.06}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-sm text-text-primary">{repo.name}</h3>
                      <ExternalLink size={14} className="text-text-tertiary" />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {repo.description ?? "No description provided."}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-tertiary">
                    {repo.language && <span>{repo.language}</span>}
                    <span className="flex items-center gap-1">
                      <Star size={12} /> {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} /> {repo.forks_count}
                    </span>
                  </div>
                </Card>
              </a>
            </FadeInSection>
          ))}
        </div>
      ) : (
        <FadeInSection>
          <Card hoverable={false} className="flex flex-col items-center gap-4 py-12 text-center">
            <Github size={24} className="text-text-tertiary" />
            <p className="text-sm text-text-secondary">
              Repository data isn&apos;t available right now — check the profile directly.
            </p>
            <Button href={githubUrl} variant="secondary">
              Visit GitHub profile
            </Button>
          </Card>
        </FadeInSection>
      )}
    </section>
  );
}
