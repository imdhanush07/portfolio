import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { LearningJourney } from "@/components/sections/LearningJourney";
import { Projects } from "@/components/sections/Projects";
import { Education } from "@/components/sections/Education";
import { Internship } from "@/components/sections/Internship";
import { Certifications } from "@/components/sections/Certifications";
import { GithubHighlights } from "@/components/sections/GithubHighlights";
import { CareerGoals } from "@/components/sections/CareerGoals";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <LearningJourney />
        <Projects />
        <Education />
        <Internship />
        <Certifications />
        <GithubHighlights />
        <CareerGoals />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
