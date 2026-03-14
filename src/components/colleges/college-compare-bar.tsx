"use client";

import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

import { getCollegesBySlugs } from "@/lib/services";
import { cn } from "@/lib/utils";

import { useCollegeCompare } from "@/components/colleges/use-college-compare";

export function CollegeCompareBar() {
  const {
    selectedSlugs,
    selectedCount,
    canCompare,
    compareHref,
    removeCollege,
    clearCompare,
  } = useCollegeCompare();

  const selectedColleges = getCollegesBySlugs(selectedSlugs);

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2">
      <div className="rounded-[26px] border border-border bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Compare Colleges
            </p>
            <p className="mt-1 text-sm text-foreground">
              Select 2 to 4 colleges for a side-by-side decision view.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {selectedColleges.map((college) => (
                <span
                  key={college.slug}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  {college.shortName}
                  <button
                    type="button"
                    onClick={() => removeCollege(college.slug)}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={`Remove ${college.name} from comparison`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
            >
              Clear
            </button>
            <Link
              href={compareHref}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                canCompare
                  ? "bg-foreground text-background hover:bg-primary"
                  : "pointer-events-none bg-muted text-muted-foreground",
              )}
            >
              Compare {selectedCount} college{selectedCount === 1 ? "" : "s"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
