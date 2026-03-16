"use client";
import Image from "next/image";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Star,
} from "lucide-react";

import { CollegeCompareBar } from "@/components/colleges/college-compare-bar";
import { CollegeQueryForm } from "@/components/colleges/college-query-form";
import { useCollegeCompare } from "@/components/colleges/use-college-compare";
import { getCollegeBySlug, getCourses } from "@/lib/services";

export default function CollegeDetail({ slug }: { slug: string }) {
  const college = getCollegeBySlug(slug);
  const COURSES = getCourses();
  const { isSelected, toggleCollege } = useCollegeCompare();

  if (!college) return null;

  const relatedCourses = COURSES.filter(
    (course) =>
      course.featuredCollegeSlugs.includes(college.slug) ||
      course.stream === college.category,
  ).slice(0, 3);

  const categoryTone =
    college.category === "Engineering"
      ? {
          badge: "bg-sky-500/15 text-sky-100 border-sky-300/20",
          accent: "text-sky-300",
          panel: "from-sky-500/20 to-cyan-400/10",
        }
      : college.category === "Medical"
        ? {
            badge: "bg-emerald-500/15 text-emerald-100 border-emerald-300/20",
            accent: "text-emerald-300",
            panel: "from-emerald-500/20 to-teal-400/10",
          }
        : college.category === "Management"
          ? {
              badge: "bg-amber-500/15 text-amber-100 border-amber-300/20",
              accent: "text-amber-300",
              panel: "from-amber-500/20 to-orange-400/10",
            }
          : college.category === "Law"
            ? {
                badge: "bg-rose-500/15 text-rose-100 border-rose-300/20",
                accent: "text-rose-300",
                panel: "from-rose-500/20 to-pink-400/10",
              }
            : college.category === "Design"
              ? {
                  badge: "bg-fuchsia-500/15 text-fuchsia-100 border-fuchsia-300/20",
                  accent: "text-fuchsia-300",
                  panel: "from-fuchsia-500/20 to-violet-400/10",
                }
              : {
                  badge: "bg-violet-500/15 text-violet-100 border-violet-300/20",
                  accent: "text-violet-300",
                  panel: "from-violet-500/20 to-indigo-400/10",
                };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_18%,#ffffff_100%)] pb-24">
      <section className="relative overflow-hidden border-b border-border bg-slate-950 text-white">
        <Image
          src={college.bannerImage}
          alt={college.name}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className={`absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.82),rgba(2,6,23,0.92))]`} />
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryTone.panel}`} />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-24">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to colleges
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${categoryTone.badge}`}>
                  {college.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                  {college.rank}
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold tracking-tight md:text-6xl">
                {college.name}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/75 md:text-lg">
                {college.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-sm text-white/80">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {college.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className={`h-4 w-4 fill-current ${categoryTone.accent}`} />
                  {college.rating} rating
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Established {college.established}
                </span>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Quick profile
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Ownership", college.ownership],
                  ["Annual fee range", college.fees],
                  ["Placement rate", college.placementRate],
                  ["Median package", college.medianPackage],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/8 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/55">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => toggleCollege(college.slug)}
                  className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isSelected(college.slug)
                      ? "bg-white text-slate-950"
                      : "border border-white/15 bg-transparent text-white hover:bg-white/10"
                  }`}
                >
                  {isSelected(college.slug) ? "Added to compare" : "Add to compare"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Fees", college.fees],
            ["Placement rate", college.placementRate],
            ["Median package", college.medianPackage],
            ["Admission route", college.cutoff],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[24px] border border-border bg-white p-5 shadow-sm">
              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${college.category === "Management" ? "text-amber-600" : college.category === "Medical" ? "text-emerald-600" : college.category === "Law" ? "text-rose-600" : college.category === "Design" ? "text-fuchsia-600" : college.category === "Science" ? "text-violet-600" : "text-sky-600"}`}>
                {label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    College overview
                  </p>
                  <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                    What students should know first
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  This profile is structured for quick decision-making: academic fit, admissions route,
                  cost, placement signal, and programme mix before deeper counselling steps.
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {college.overview}
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {college.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-border bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <BadgeCheck className={`mt-1 h-5 w-5 shrink-0 ${college.category === "Management" ? "text-amber-500" : college.category === "Medical" ? "text-emerald-500" : college.category === "Law" ? "text-rose-500" : college.category === "Design" ? "text-fuchsia-500" : college.category === "Science" ? "text-violet-500" : "text-sky-500"}`} />
                      <p className="text-sm leading-6 text-foreground">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Admission and academics
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                Courses, exams, and access
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    Exams accepted
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                    {college.examsAccepted.join(", ")}
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    Approvals
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                    {college.approvedBy.join(", ")}
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    Campus size
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                    {college.campusSize}
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Popular academic options
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {college.topPrograms.map((program) => (
                    <span
                      key={program}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Placements and fees
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                Outcome and cost snapshot
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ["Annual fee range", college.fees],
                  ["Hostel fee", college.avgHostelFee],
                  ["Median package", college.medianPackage],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-border bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-border bg-white p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Placement signal
                </p>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  {college.placementRate} placement rate
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Use this with programme strength and fee context. A strong college decision should
                  balance affordability, admission difficulty, and likely outcomes together.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Campus gallery and experience
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                Real study and campus moments
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {college.experienceGallery.slice(0, 6).map((image) => (
                  <figure
                    key={image.src}
                    className="overflow-hidden rounded-[24px] border border-border bg-slate-50"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="h-52 w-full object-cover"
                    />
                    <figcaption className="p-4 text-sm leading-6 text-muted-foreground">
                      {image.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Student and alumni voices
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                What the outcome can look like
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {college.studentVoices.map((voice) => (
                  <article key={voice.name} className="rounded-[24px] border border-border bg-slate-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-display font-bold text-foreground">{voice.name}</p>
                        <p className="mt-1 text-sm font-medium text-muted-foreground">
                          {voice.programme}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-foreground ring-1 ring-border">
                        {voice.package}
                      </span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-foreground">
                      {voice.role}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      “{voice.quote}”
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Quick compare sheet
              </p>
              <div className="mt-5 space-y-4">
                {[
                  ["Primary cutoff route", college.cutoff],
                  ["Hostel fee", college.avgHostelFee],
                  ["City and state", `${college.city}, ${college.state}`],
                  ["Approvals", college.approvedBy.join(", ")],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-border bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Best for
              </p>
              <ul className="mt-4 space-y-3 border-b border-border pb-5">
                {college.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm leading-6 text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-5 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Related courses
              </p>
              <div className="mt-5 space-y-4">
                {relatedCourses.map((course) => (
                  <div key={course.slug} className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold text-foreground">{course.name}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {course.overview}
                    </p>
                    <Link
                      href={`/colleges?stream=${encodeURIComponent(course.stream)}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      Explore {course.stream} colleges
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <CollegeQueryForm collegeName={college.name} />
          </div>
        </div>
      </section>
      <CollegeCompareBar />
    </div>
  );
}
