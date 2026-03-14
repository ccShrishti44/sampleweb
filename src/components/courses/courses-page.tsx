"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Clock3,
  GraduationCap,
  Search,
} from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { getCourses, getCourseStreams } from "@/lib/services";

const COURSES = getCourses();
const STREAM_OPTIONS = getCourseStreams();

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState<"All" | (typeof STREAM_OPTIONS)[number]>("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.specialisations.some((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesStream =
        selectedStream === "All" || course.stream === selectedStream;
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesStream && matchesLevel;
    });
  }, [searchTerm, selectedLevel, selectedStream]);

  const featuredCourse = filteredCourses[0] ?? COURSES[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_30%,#ffffff_100%)] pb-24">
      <PageHero
        eyebrow="Academic Pathways"
        title="Choose a course|with a clear academic path"
        description="Compare disciplined, high-demand programmes across engineering, medicine, management, law, design, and science. The goal is clarity: what the course covers, where it leads, and which colleges are strongest for it."
        variant="mesh"
        stats={[
          ["Structured courses", `${COURSES.length} curated options`],
          ["Career visibility", "Outcome-led summaries"],
          ["College alignment", "Direct path to best-fit institutes"],
        ]}
      >
        <div className="rounded-[28px] border border-slate-200 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Featured Programme
          </p>
          <h2 className="mt-3 text-3xl font-display font-bold text-foreground">
            {featuredCourse.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {featuredCourse.overview}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-muted/50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Duration
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                {featuredCourse.duration}
              </p>
            </div>
            <div className="rounded-2xl bg-muted/50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Typical entry salary
              </p>
              <p className="mt-2 text-base font-semibold text-foreground">
                {featuredCourse.avgSalary}
              </p>
            </div>
          </div>

          <Link
            href={`/colleges?stream=${encodeURIComponent(featuredCourse.stream)}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Explore aligned colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </PageHero>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-12">
        <div className="rounded-[28px] border border-border bg-white p-5 shadow-sm md:p-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by course, specialisation, or keyword"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-2xl border border-border bg-muted/30 py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary focus:bg-white"
              />
            </label>

            <select
              value={selectedStream}
              onChange={(event) =>
                setSelectedStream(event.target.value as "All" | (typeof STREAM_OPTIONS)[number])
              }
              className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            >
              {STREAM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All streams" : option}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(event) => setSelectedLevel(event.target.value)}
              className="rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="All">All levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Integrated">Integrated</option>
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Course Directory
            </p>
            <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
              {filteredCourses.length} programme{filteredCourses.length === 1 ? "" : "s"} matched
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            Each card is structured to show scope, entry route, and where the
            programme is best pursued, so students can compare options without
            reading through noise.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                href={`/courses/${course.slug}`}
                className="group block rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                      {course.stream}
                    </span>
                     <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {course.level}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-display font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-4">
                  {course.name}
                </h3>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="rounded-xl bg-muted/40 p-2.5 text-center">
                    <Clock3 className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{course.duration}</p>
                  </div>
                  <div className="rounded-xl bg-muted/40 p-2.5 text-center">
                    <Building2 className="h-3.5 w-3.5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-xs font-semibold text-foreground">{course.collegesCount}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3">
                  <span className="text-xs font-medium text-muted-foreground truncate max-w-[120px]">
                    Exams: {course.entranceExams[0]}
                  </span>
                  <span className="flex items-center text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                    View <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="mt-10 rounded-[28px] border border-dashed border-border bg-white px-6 py-16 text-center">
            <h3 className="text-2xl font-display font-bold text-foreground">
              No matching course found
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Try a broader keyword or reset the stream and level filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStream("All");
                setSelectedLevel("All");
              }}
              className="mt-5 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
