import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, CheckCircle2, Scale } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import {
  COLLEGE_COMPARE_FIELDS,
  getCollegesBySlugs,
} from "@/lib/services";

export default function CollegeComparePage({
  selectedSlugs,
}: {
  selectedSlugs: string[];
}) {
  const colleges = getCollegesBySlugs(selectedSlugs).slice(0, 4);

  if (colleges.length < 2) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_18%,#ffffff_100%)] pb-24">
        <PageHero
          eyebrow="College Compare"
          title="Compare colleges|with a decision-ready view"
          description="Choose at least two colleges to compare fees, admissions, placements, exams, and overall fit side by side."
          variant="wave"
          stats={[
            ["Decision lens", "Fees, access, outcomes"],
            ["Best use", "Shortlisting 2 to 4 colleges"],
            ["Format", "Structured side-by-side table"],
          ]}
        />

        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
          <div className="rounded-[28px] border border-dashed border-border bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-3xl font-display font-bold text-foreground">
              Select at least two colleges
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
              Start from the college listing or any college profile page. Add the colleges you
              want to review, then open compare for a clearer decision view.
            </p>
            <Link
              href="/colleges"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary"
            >
              Back to colleges
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_18%,#ffffff_100%)] pb-24">
      <PageHero
        eyebrow="College Compare"
        title="See your shortlist|side by side"
        description="This compare view keeps only the fields that usually drive decisions first: fees, admission route, exams accepted, placements, approvals, and top programmes."
        variant="wave"
        stats={[
          ["Colleges selected", `${colleges.length}`],
          ["Comparison focus", "Cost, access, outcomes"],
          ["Use case", "Fast shortlist refinement"],
        ]}
      />

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <Link
          href="/colleges"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to colleges
        </Link>

        <div className="mt-8 grid gap-4 xl:grid-cols-[280px_repeat(auto-fit,minmax(220px,1fr))]">
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Scale className="h-4 w-4" />
              What to compare first
            </div>
            <ul className="mt-5 space-y-3">
              {[
                "Annual fees and hostel fee for affordability",
                "Exams accepted and cutoff route for access",
                "Placement rate and median package for outcomes",
                "Approvals, campus size, and top programmes for fit",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {colleges.map((college) => (
            <article
              key={college.slug}
              className="overflow-hidden rounded-[28px] border border-border bg-white shadow-sm"
            >
              <div className="relative h-40">
                <Image
                  src={college.image}
                  alt={college.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                    {college.rank}
                  </p>
                  <h2 className="mt-2 text-xl font-display font-bold">{college.shortName}</h2>
                  <p className="mt-1 text-sm text-white/75">{college.location}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                    {college.category}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {college.ownership}
                  </span>
                </div>

                <Link
                  href={`/colleges/${college.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Open full profile
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-border bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 min-w-[220px] border-b border-border bg-slate-50 px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Comparison factor
                  </th>
                  {colleges.map((college) => (
                    <th
                      key={college.slug}
                      className="min-w-[240px] border-b border-border bg-white px-5 py-4 text-left text-sm font-semibold text-foreground"
                    >
                      {college.shortName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COLLEGE_COMPARE_FIELDS.map((field) => (
                  <tr key={field.key}>
                    <td className="sticky left-0 z-10 border-b border-border bg-slate-50 px-5 py-4 align-top text-sm font-semibold text-foreground">
                      {field.label}
                    </td>
                    {colleges.map((college) => {
                      const value = field.getValue(college);

                      return (
                        <td
                          key={`${field.key}-${college.slug}`}
                          className="border-b border-border px-5 py-4 align-top text-sm leading-6 text-muted-foreground"
                        >
                          {field.type === "list" && Array.isArray(value) ? (
                            <ul className="space-y-2">
                              {value.map((item) => (
                                <li key={item} className="text-foreground">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-foreground">{value}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
