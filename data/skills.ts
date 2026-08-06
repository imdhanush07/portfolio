import type { Skill, LearningItem } from "@/types";

export const skills: Skill[] = [
  { name: "Java", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "JavaScript", category: "Programming" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "Canva", category: "Tools" },
  { name: "Microsoft Excel", category: "Tools" },
  { name: "English", category: "Languages" },
  { name: "Tamil", category: "Languages" },
];

export const learningJourney: LearningItem[] = [
  {
    name: "Java Full Stack Development",
    description:
      "Building end-to-end applications by combining Java backend services with modern frontend practices.",
  },
  {
    name: "Spring Boot",
    description:
      "Developing production-style backend services with dependency injection and convention-based configuration.",
  },
  {
    name: "REST APIs",
    description:
      "Designing and consuming HTTP APIs that connect frontend applications to backend logic.",
  },
  {
    name: "JDBC",
    description:
      "Connecting Java applications directly to relational databases for persistent data handling.",
  },
  {
    name: "SQL",
    description:
      "Writing queries to model, store, and retrieve structured data efficiently.",
  },
];
