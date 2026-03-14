"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Filter,
  GraduationCap,
  MapPin,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";

import { CollegeCompareBar } from "@/components/colleges/college-compare-bar";
import { useCollegeCompare } from "@/components/colleges/use-college-compare";
import { PageHero } from "@/components/page-hero";
import { getColleges, getCollegeStreams } from "@/lib/services";

type SortValue = "rating" | "fees" | "name";
const COLLEGES = getColleges();
const STREAM_OPTIONS = getCollegeStreams();

function normaliseFee(value: string) {
  const match = value.match(/(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
}

export default function Colleges({
  presetStream,
}: {
  presetStream?: string;
}) {
  const initialStream =
    STREAM_OPTIONS.includes((presetStream as (typeof STREAM_OPTIONS)[number]) ?? "All")
      ? ((presetStream as (typeof STREAM_OPTIONS)[number]) ?? "All")
      : "All";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState(initialStream);
  const [selectedState, setSelectedState] = useState("All states");
  const [sortBy, setSortBy] = useState<SortValue>("rating");
  const { isSelected, toggleCollege } = useCollegeCompare();

  useEffect(() => {
    setSelectedStream(initialStream);
  }, [initialStream]);

  const states = useMemo(
    () => ["All states", ...new Set(COLLEGES.map((college) => college.state))],
    [],
  );

  const filteredColleges = useMemo(() => {
    const base = COLLEGES.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.topPrograms.some((program) =>
          program.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesStream =
        selectedStream === "All" || college.category === selectedStream;
      const matchesState =
        selectedState === "All states" || college.state === selectedState;

      return matchesSearch && matchesStream && matchesState;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "fees") return normaliseFee(a.fees) - normaliseFee(b.fees);
      return b.rating - a.rating;
    });
  }, [searchTerm, selectedState, selectedStream, sortBy]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_18%,#ffffff_100%)] pb-24">
      <PageHero
        eyebrow="College Directory"
        title="Compare colleges|with the detail that matters"
        description="Review programmes, exams accepted, fee context, location, and campus highlights in a cleaner format. Each profile now leads to a dedicated slug page for deeper evaluation."
        variant="wave"
        stats={[
          ["Institutes listed", `${COLLEGES.length}`],
          ["Streams covered", "Engineering to Law"],
          ["Profile depth", "Structured facts and outcomes"],
        ]}
      />

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Filter className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Refine results</p>
                  <p className="text-xs text-muted-foreground">
                    Narrow by stream, location, and intent.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="relative block">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search college or programme"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-muted/30 py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:bg-white"
                  />
                </label>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Stream
                  </p>
                  <select
                    value={selectedStream}
                    onChange={(event) =>
                      setSelectedStream(event.target.value as (typeof STREAM_OPTIONS)[number])
                    }
                    className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
                  >
                    {STREAM_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option === "All" ? "All streams" : option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    State
                  </p>
                  <select
                    value={selectedState}
                    onChange={(event) => setSelectedState(event.target.value)}
                    className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
                  >
                    {states.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Sort
                  </p>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortValue)}
                    className="w-full rounded-2xl border border-border bg-muted/30 px-4 py-3 text-sm outline-none focus:border-primary"
                  >
                    <option value="rating">Highest rated</option>
                    <option value="fees">Lower fees first</option>
                    <option value="name">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Results
                </p>
                <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                  {filteredColleges.length} college{filteredColleges.length === 1 ? "" : "s"}
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Use the college cards for quick comparison, then open the profile
                page to review campus context, top programmes, and admissions fit.
                You can add up to four colleges to compare side by side.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {filteredColleges.map((college, index) => (
                <motion.article
                  key={college.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="overflow-hidden rounded-[24px] border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                >
                  <div className="grid gap-0 xl:grid-cols-[180px_minmax(0,1fr)_240px]">
                    <div className="relative h-40 xl:h-full">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                      <div className="absolute left-5 top-5 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        {college.rating}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                          {college.category}
                        </p>
                        <h3 className="mt-2 text-xl font-display font-bold">
                          {college.shortName}
                        </h3>
                        <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                          <MapPin className="h-4 w-4" />
                          {college.location}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 md:p-5">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <h4 className="text-xl font-display font-bold text-foreground">
                            {college.name}
                          </h4>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                              {college.rank}
                            </span>
                            <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                              {college.ownership}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/colleges/${college.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                        >
                          Open profile <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {college.overview}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground">
                          <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                          {college.fees}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground">
                          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground" />
                          {college.examsAccepted[0]}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
                          {college.placementRate}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {college.topPrograms.slice(0, 2).map((program) => (
                          <span
                            key={program}
                            className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-foreground"
                          >
                            {program}
                          </span>
                        ))}
                        <span className="rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                          {college.highlights[0]}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-border bg-slate-50/80 p-4 xl:border-l xl:border-t-0">
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                        Decision snapshot
                      </p>
                      <div className="mt-3 space-y-3">
                        <div className="rounded-2xl border border-border bg-white p-3.5">
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            Median package
                          </p>
                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {college.medianPackage}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-white p-3.5">
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            Cutoff route
                          </p>
                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {college.cutoff}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-white p-3.5">
                          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            Ownership
                          </p>
                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {college.ownership}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        <Link
                          href={`/colleges/${college.slug}`}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-primary"
                        >
                          View full profile
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleCollege(college.slug)}
                          className={`flex w-full items-center justify-center rounded-2xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                            isSelected(college.slug)
                              ? "border-foreground bg-foreground text-background"
                              : "border-border bg-white text-foreground hover:border-foreground"
                          }`}
                        >
                          {isSelected(college.slug) ? "Added to compare" : "Add to compare"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <div className="mt-8 rounded-[28px] border border-dashed border-border bg-white px-6 py-16 text-center">
                <h3 className="text-2xl font-display font-bold text-foreground">
                  No colleges match the current filters
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Clear the search or broaden the stream and state filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedStream("All");
                    setSelectedState("All states");
                    setSortBy("rating");
                  }}
                  className="mt-5 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <CollegeCompareBar />
    </div>
  );
}
