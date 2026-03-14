"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type HeroVariant =
  | "wave"
  | "mesh"
  | "slate"
  | "sunrise"
  | "emerald"
  | "violet"
  | "deep";

const heroStyles: Record<
  HeroVariant,
  {
    section: string;
    panel: string;
    accent: string;
    glowA: string;
    glowB: string;
    grid: string;
  }
> = {
  wave: {
    section:
      "bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92),rgba(37,99,235,0.82))] text-white",
    panel: "bg-white/10 border-white/12 text-white/90",
    accent: "text-cyan-200",
    glowA: "bg-cyan-400/18",
    glowB: "bg-orange-400/18",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.14)_1px,transparent_0)] [background-size:22px_22px]",
  },
  mesh: {
    section:
      "bg-[linear-gradient(135deg,rgba(250,250,255,1),rgba(238,244,255,1),rgba(255,248,240,1))] text-slate-950",
    panel: "bg-white/70 border-slate-200 text-slate-700",
    accent: "text-primary",
    glowA: "bg-blue-400/15",
    glowB: "bg-orange-300/20",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:22px_22px]",
  },
  slate: {
    section:
      "bg-[linear-gradient(135deg,rgba(2,6,23,1),rgba(17,24,39,0.98),rgba(51,65,85,0.92))] text-white",
    panel: "bg-white/10 border-white/12 text-white/85",
    accent: "text-orange-200",
    glowA: "bg-blue-400/12",
    glowB: "bg-slate-300/10",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:22px_22px]",
  },
  sunrise: {
    section:
      "bg-[linear-gradient(135deg,rgba(255,247,237,1),rgba(255,237,213,0.95),rgba(255,255,255,1))] text-slate-950",
    panel: "bg-white/75 border-orange-100 text-slate-700",
    accent: "text-orange-600",
    glowA: "bg-orange-300/18",
    glowB: "bg-yellow-300/18",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(120,53,15,0.08)_1px,transparent_0)] [background-size:22px_22px]",
  },
  emerald: {
    section:
      "bg-[linear-gradient(135deg,rgba(236,253,245,1),rgba(220,252,231,0.96),rgba(239,246,255,1))] text-slate-950",
    panel: "bg-white/75 border-emerald-100 text-slate-700",
    accent: "text-emerald-700",
    glowA: "bg-emerald-300/18",
    glowB: "bg-sky-300/18",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(6,78,59,0.08)_1px,transparent_0)] [background-size:22px_22px]",
  },
  violet: {
    section:
      "bg-[linear-gradient(135deg,rgba(245,243,255,1),rgba(238,242,255,0.98),rgba(255,247,237,1))] text-slate-950",
    panel: "bg-white/75 border-violet-100 text-slate-700",
    accent: "text-violet-700",
    glowA: "bg-violet-300/18",
    glowB: "bg-fuchsia-300/14",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(76,29,149,0.08)_1px,transparent_0)] [background-size:22px_22px]",
  },
  deep: {
    section:
      "bg-[linear-gradient(135deg,rgba(3,7,18,1),rgba(15,23,42,0.97),rgba(30,64,175,0.85))] text-white",
    panel: "bg-white/10 border-white/12 text-white/85",
    accent: "text-sky-200",
    glowA: "bg-sky-400/15",
    glowB: "bg-indigo-400/16",
    grid: "bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.11)_1px,transparent_0)] [background-size:22px_22px]",
  },
};

function SplitHeadline({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const lines = text.split("|").map((line) => line.trim());

  if (reduceMotion) {
    return (
      <div className={className}>
        {lines.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>
    );
  }

  return (
    <div className={className} aria-label={text.split("|").join(" ")}>
      {lines.map((line, lineIndex) => (
        <div key={`${line}-${lineIndex}`} className="overflow-hidden">
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              key={`${word}-${wordIndex}`}
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.45,
                delay: lineIndex * 0.16 + wordIndex * 0.045,
              }}
              className="inline-block pr-[0.28em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  variant,
  stats,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  variant: HeroVariant;
  stats?: Array<[string, string]>;
  children?: React.ReactNode;
  className?: string;
}) {
  const theme = heroStyles[variant];

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/50",
        theme.section,
        className,
      )}
    >
      <div className={cn("absolute inset-0 opacity-80", theme.grid)} />
      <motion.div
        aria-hidden="true"
        className={cn("absolute -left-20 top-8 h-64 w-64 rounded-full blur-3xl", theme.glowA)}
        animate={{ x: [0, 28, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className={cn("absolute right-[-3rem] top-16 h-72 w-72 rounded-full blur-3xl", theme.glowB)}
        animate={{ x: [0, -22, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-18">
        <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-end">
          <div>
            <span
              className={cn(
                "inline-flex rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
                theme.panel,
              )}
            >
              {eyebrow}
            </span>
            <SplitHeadline
              text={title}
              className="mt-6 max-w-5xl font-display text-4xl font-bold tracking-tight md:text-6xl"
            />
            <p className="mt-5 max-w-3xl text-base leading-7 text-current/75 md:text-lg">
              {description}
            </p>
          </div>

          <div className="space-y-4">
            {stats && (
              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map(([label, value]) => (
                  <div
                    key={label}
                    className={cn(
                      "rounded-[22px] border p-4 shadow-sm backdrop-blur",
                      theme.panel,
                    )}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-current/65">
                      {label}
                    </p>
                    <p className={cn("mt-2 text-lg font-semibold", theme.accent)}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
