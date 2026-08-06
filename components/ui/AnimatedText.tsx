"use client";

import { useEffect, useState } from "react";

interface AnimatedTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

/**
 * Cycles through a list of role titles with a typing/deleting effect.
 * Pure setTimeout-driven state machine — no external dependency needed.
 */
export function AnimatedText({
  words,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseDuration = 1800,
  className,
}: AnimatedTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // Lazy initializer avoids setState-in-effect; safe because this is a
  // client-only component and the brief flicker on hydration is harmless.
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion) return;

    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charCount < currentWord.length) {
      timeout = setTimeout(() => setCharCount((c) => c + 1), typingSpeed);
    } else if (!isDeleting && charCount === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && charCount > 0) {
      timeout = setTimeout(() => setCharCount((c) => c - 1), deletingSpeed);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, reducedMotion]);

  const displayText = reducedMotion ? words[0] : words[wordIndex].slice(0, charCount);

  return (
    <span className={className}>
      {displayText}
      <span className="ml-1 inline-block w-[2px] animate-pulse bg-accent-secondary align-middle h-[1em]" aria-hidden />
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
