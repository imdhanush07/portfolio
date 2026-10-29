"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "./variants";
import type { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Wraps section content with a consistent scroll-triggered reveal.
 * Centralizes animation timing so it never needs to be re-implemented
 * per section. Fires once; respects prefers-reduced-motion globally
 * via the CSS override in globals.css.
 */
export function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
