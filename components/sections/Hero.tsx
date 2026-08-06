"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/Button";
import { staggerContainer, heroItem } from "@/components/motion/variants";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-fade-mask">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/20 blur-[120px]" />
        <div className="absolute left-1/3 top-2/3 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-accent-secondary/10 blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center"
      >
        {/* Portrait */}
        <motion.div variants={heroItem} className="group relative mb-8">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-primary via-accent-secondary to-accent-primary opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-90 animate-[spin_8s_linear_infinite]"
          />
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-bg-base sm:h-36 sm:w-36">
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              priority
              sizes="144px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>

        <motion.span
          variants={heroItem}
          className="mb-4 rounded-full border border-border-subtle bg-bg-elevated px-4 py-1.5 font-mono text-xs text-text-secondary"
        >
          Open to Full Stack &amp; Backend opportunities
        </motion.span>

        <motion.h1
          variants={heroItem}
          className="text-4xl font-semibold tracking-tight text-text-primary sm:text-6xl"
        >
          Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
        </motion.h1>

        <motion.div
          variants={heroItem}
          className="mt-4 h-8 font-mono text-lg text-text-secondary sm:text-xl"
        >
          <AnimatedText words={profile.roles} />
        </motion.div>

        <motion.p
          variants={heroItem}
          className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary"
        >
          {profile.summary}
        </motion.p>

        <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#projects" variant="primary">
            View my work
          </Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-text-tertiary transition-colors duration-150 hover:text-text-secondary"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
