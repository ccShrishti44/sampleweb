import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
} from "lucide-react";

import { COURSES, STREAM_OPTIONS } from "@/lib/data";

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
      <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.10),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(249,115,22,0.12),_transparent_30%)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
                Academic Pathways
              </span>
              <h1 className="mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Choose a course with a clear academic path and career outcome.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Compare disciplined, high-demand programmes across engineering,
                medicine, management, law, design, and science. The focus here is
                clarity: what the course covers, where it leads, and which
                colleges are strongest for it.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Structured courses", `${COURSES.length} curated options`],
                  ["Career visibility", "Outcomes and salary bands"],
                  ["College alignment", "Direct path to leading institutes"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-white/80 p-4 shadow-sm"
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white/85 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] backdrop-blur">
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
                to={`/colleges?stream=${encodeURIComponent(featuredCourse.stream)}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Explore aligned colleges <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

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

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {filteredCourses.map((course, index) => (
            <motion.article
              key={course.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-[28px] border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <GraduationCap className="h-7 w-7" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                          {course.stream}
                        </span>
                        <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="mt-4 text-2xl font-display font-bold text-foreground">
                        {course.name}
                      </h3>
                    </div>

                    <Link
                      to={`/colleges?stream=${encodeURIComponent(course.stream)}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      View colleges <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {course.overview}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-muted/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        Duration
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {course.duration}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-muted/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        Salary Band
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {course.avgSalary}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-muted/40 p-4">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                        <Building2 className="h-4 w-4" />
                        Colleges
                      </div>
                      <p className="mt-2 text-sm font-semibold text-foreground">
                        {course.collegesCount}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.95fr]">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Eligibility and format
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {course.eligibility}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {course.learningFormat}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Best suited for
                      </p>
                      <ul className="mt-3 space-y-2">
                        {course.outcomes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-6 text-foreground"
                          >
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Popular specialisations
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {course.specialisations.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-white px-3 py-1 text-sm text-foreground shadow-sm ring-1 ring-border"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
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
