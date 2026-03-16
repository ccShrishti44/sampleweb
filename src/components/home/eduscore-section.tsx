"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target } from "lucide-react";

import { getEduScoreResults, EDUSCORE_EXAMS_BY_STREAM, type EduScoreExamType } from "@/lib/eduscore";
import type { Stream } from "@/lib/types/content";

const STREAMS: Stream[] = [
  "Engineering",
  "Medical",
  "Management",
  "Law",
  "Design",
  "Science",
];

function fitLabel(score: number) {
  if (score >= 88) return "Strong";
  if (score >= 72) return "Competitive";
  if (score >= 58) return "Developing";
  return "Stretch";
}

export function EduScoreSection() {
  const [stream, setStream] = useState<Stream>("Engineering");
  const [examType, setExamType] = useState<EduScoreExamType>("jee_percentile");
  const [score, setScore] = useState(94);
  const [budgetLpa, setBudgetLpa] = useState(4);

  const examOptions = EDUSCORE_EXAMS_BY_STREAM[stream];
  const activeExam = examOptions.find((item) => item.id === examType) ?? examOptions[0];

  useEffect(() => {
    setExamType(examOptions[0].id);
    setScore(examOptions[0].defaultValue);
  }, [examOptions]);

  useEffect(() => {
    setScore(activeExam.defaultValue);
  }, [activeExam.defaultValue, activeExam.id]);

  const results = useMemo(
    () => getEduScoreResults({ stream, examType, score, budgetLpa }),
    [budgetLpa, examType, score, stream],
  );

  const topMatch = results[0];
  const shortlist = results.slice(0, 3);

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Discover Your <span className="text-gradient">EduScore</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            A working demo predictor using sample benchmark data. It compares your
            exam score, fee comfort, and college outcome strength to surface a
            sharper shortlist.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "Normalised against actual exam score formats by stream",
              "Uses sample competitiveness benchmarks college by college",
              "Shows the breakdown instead of hiding it behind vague AI copy",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0" />
                <span className="font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-[30px] border border-border bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Target stream
                </span>
                <select
                  value={stream}
                  onChange={(event) => setStream(event.target.value as Stream)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  {STREAMS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Exam metric
                </span>
                <select
                  value={examType}
                  onChange={(event) => setExamType(event.target.value as EduScoreExamType)}
                  className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  {examOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Your score
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {score}
                    {activeExam.unit.startsWith("/") ? ` ${activeExam.unit}` : ` ${activeExam.unit}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={activeExam.min}
                  max={activeExam.max}
                  step={activeExam.step}
                  value={score}
                  onChange={(event) => setScore(Number(event.target.value))}
                  className="mt-3 w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{activeExam.min}</span>
                  <span>{activeExam.max}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Budget comfort
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    INR {budgetLpa}L / year
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={budgetLpa}
                  onChange={(event) => setBudgetLpa(Number(event.target.value))}
                  className="mt-3 w-full accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>1L</span>
                  <span>15L+</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {topMatch ? (
            <div className="relative z-10 rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 text-white shadow-2xl">
              <div className="flex justify-between items-start gap-6">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">Top sample match</p>
                  <h3 className="font-display text-2xl font-bold">{topMatch.college.name}</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Based on {activeExam.label.toLowerCase()} and your current fee comfort.
                  </p>
                </div>
                <div className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-accent px-4">
                  <span className="text-xl font-bold text-accent">{topMatch.overallScore}%</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  { label: "Academic fit", value: topMatch.academicFit, color: "bg-emerald-500", text: fitLabel(topMatch.academicFit) },
                  { label: "Affordability", value: topMatch.affordabilityFit, color: "bg-sky-500", text: fitLabel(topMatch.affordabilityFit) },
                  { label: "Outcome strength", value: topMatch.outcomeStrength, color: "bg-accent", text: fitLabel(topMatch.outcomeStrength) },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">{item.label}</span>
                      <span>{item.text}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800">
                      <div
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {shortlist.map((item) => (
                  item && (
                    <Link
                      key={item.college.slug}
                      href={`/colleges/${item.college.slug}`}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/25"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                        {item.overallScore}% match
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-white">
                        {item.college.shortName}
                      </p>
                      <p className="mt-2 text-xs text-white/65">
                        Target: {item.benchmark.targetScore} {activeExam.unit}
                      </p>
                    </Link>
                  )
                ))}
                              </div>

              <div className="mt-8 flex items-center justify-between border-t border-gray-800 pt-6">
                <span className="text-sm text-gray-400">
                  Demo model using stream-specific benchmark data
                </span>
                <Link
                  href={`/colleges?stream=${encodeURIComponent(stream)}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white"
                >
                  Explore shortlist
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-display font-bold text-foreground">
                  No benchmark available for this exam view
                </h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Switch the stream or exam metric to see the sample scoring model.
              </p>
            </div>
          )}

          <div className="absolute top-10 right-10 h-full w-full rounded-3xl bg-primary/20 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
