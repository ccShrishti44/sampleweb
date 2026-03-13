import React from "react";
import { Link, useParams } from "react-router-dom";
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

import NotFound from "@/pages/not-found";
import { COURSES, getCollegeBySlug } from "@/lib/data";

export default function CollegeDetail() {
  const { slug } = useParams();
  const college = slug ? getCollegeBySlug(slug) : undefined;

  if (!college) {
    return <NotFound />;
  }

  const relatedCourses = COURSES.filter(
    (course) =>
      course.featuredCollegeSlugs.includes(college.slug) ||
      course.stream === college.category,
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_18%,#ffffff_100%)] pb-24">
      <section className="relative overflow-hidden border-b border-border bg-slate-950 text-white">
        <img
          src={college.image}
          alt={college.name}
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.82),rgba(2,6,23,0.92))]" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-20 md:py-24">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to colleges
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
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
                  <Star className="h-4 w-4 fill-accent text-accent" />
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
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Why this college stands out
                  </p>
                  <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                    Fast decision view
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  These are the signals users usually need before they go deeper:
                  academic reputation, campus fit, admissions route, and outcome quality.
                </p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {college.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-border bg-slate-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-6 text-foreground">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Programme portfolio
              </p>
              <h2 className="mt-2 text-3xl font-display font-bold text-foreground">
                Popular academic options
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {college.topPrograms.map((program) => (
                  <span
                    key={program}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-sm"
                  >
                    {program}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
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
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Admissions snapshot
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

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
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
                      to={`/colleges?stream=${encodeURIComponent(course.stream)}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      Explore {course.stream} colleges
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
