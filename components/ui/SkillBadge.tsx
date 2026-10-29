"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="inline-flex items-center rounded-full border border-border-subtle bg-bg-elevated px-4 py-2 font-mono text-sm text-text-secondary transition-colors duration-150 hover:border-accent-primary/50 hover:text-text-primary hover:shadow-[0_0_20px_-4px_var(--accent-primary)]"
    >
      {name}
    </motion.span>
  );
}
