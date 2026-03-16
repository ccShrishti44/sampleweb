"use client";
import Image from "next/image";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Compass,
  ScrollText,
} from "lucide-react";

import { PageHero } from "@/components/page-hero";
import {
  getCollegeBySlug,
  getCourseBySlug,
} from "@/lib/services";

export default function CourseDetailPage({ slug }: { slug: string }) {
  const course = getCourseBySlug(slug);

  if (!course) return null;

  const featuredColleges = course.featuredCollegeSlugs
    .map((collegeSlug) => getCollegeBySlug(collegeSlug))
    .filter((college): college is NonNullable<typeof college> => Boolean(college))
    .slice(0, 3);

  const admissionSteps = [
    `Check eligibility: ${course.eligibility}`,
    `Prepare for the common admission route: ${course.entranceExams.join(", ")}`,
    "Compare colleges on academics, fees, city fit, training quality, and outcomes before finalising your shortlist.",
  ];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_18%,#ffffff_100%)] pb-24">
      <PageHero
        eyebrow={`${course.stream} Programme`}
        title={`${course.name}|with a clearer decision view`}
        description={course.overview}
        variant="mesh"
        stats={[
          ["Level", course.level],
          ["Duration", course.duration],
          ["Typical outcome", course.avgSalary],
        ]}
      >
      </PageHero>

      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to courses
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] items-start">
          
          {/* LEFT COLUMN - Rich Article Flow */}
          <div className="space-y-12">
            
            {/* Overview Section */}
            <section>
              <h2 className="text-3xl font-display font-extrabold text-foreground mb-4">
                About the Programme
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                <p className="text-base">{course.overview}</p>
                <p className="text-base mt-4">{course.learningFormat}</p>
              </div>
            </section>

            {/* Outcomes & Fit Section */}
            <section className="border-t border-border pt-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Why Students Choose This Course
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {course.outcomes.map((item) => (
                  <div key={item} className="flex gap-4 items-start">
                    <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                       <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Clear Outcome</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-slate-50 border border-border rounded-2xl p-6">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <Compass className="h-5 w-5 text-accent"/> Ideal Candidate Profile
                </h3>
                <ul className="space-y-3">
                  {course.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Curriculum Section */}
            <section className="border-t border-border pt-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                What You Study
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {course.curriculumAreas.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-white border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold text-foreground mb-4">Popular Specialisations</h3>
              <div className="flex flex-wrap gap-2.5">
                {course.specialisations.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-muted/50 border border-border px-4 py-2 text-sm font-medium text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            {/* Career Pathways */}
            <section className="border-t border-border pt-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Career Pathways & Top Roles
              </h2>
              <div className="flex flex-wrap gap-3">
                {course.topRoles.map((role) => (
                  <div key={role} className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 shadow-sm">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">{role}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Path */}
             <section className="border-t border-border pt-10">
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                General Admission Path
              </h2>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {admissionSteps.map((step, idx) => (
                  <div key={step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] rounded-2xl border border-border bg-white p-4 shadow-sm">
                      <p className="text-sm leading-relaxed text-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-8">
            
            {/* Quick Facts Widget */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-primary" />
                Course Info
              </h3>
              <div className="space-y-4">
                {[
                  ["Duration", course.duration],
                  ["Level", course.level],
                  ["Avg Salary", course.avgSalary],
                  ["Top Exams", course.entranceExams.join(", ")],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-sm font-semibold text-foreground text-right max-w-[150px]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Widget */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Eligibility Base
              </h3>
              <p className="text-sm text-foreground leading-relaxed font-medium">
                {course.eligibility}
              </p>
            </div>

            {/* Top Colleges Widget */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground mb-5 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Top Ranked Colleges
              </h3>
              <div className="space-y-4">
                {featuredColleges.map((college) => (
                  <Link key={college.slug} href={`/colleges/${college.slug}`} className="block group">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-border">
                        <Image src={college.image} alt={college.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{college.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                           <span className="font-bold text-accent">Rating {college.rating}</span> | {college.city}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`/colleges?stream=${encodeURIComponent(course.stream)}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 text-primary px-4 py-2.5 text-sm font-bold transition-colors hover:bg-primary hover:text-white"
              >
                View all colleges <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <Link
                href={`/colleges/compare?items=${encodeURIComponent(
                  featuredColleges.map((college) => college.slug).join(","),
                )}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-bold text-background transition-colors hover:bg-primary"
              >
                Compare featured colleges
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
