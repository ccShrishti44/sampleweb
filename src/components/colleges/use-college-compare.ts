"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "eduexpert_college_compare";
const EVENT_NAME = "eduexpert-college-compare-updated";
const MAX_COMPARE_ITEMS = 4;

function readStoredSlugs() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as string[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE_ITEMS) : [];
  } catch {
    return [];
  }
}

function persistSlugs(nextSlugs: string[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSlugs));
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function buildCollegeCompareHref(slugs: string[]) {
  return `/colleges/compare?items=${encodeURIComponent(slugs.join(","))}`;
}

export function useCollegeCompare() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSelectedSlugs(readStoredSlugs());

    const sync = () => setSelectedSlugs(readStoredSlugs());
    window.addEventListener(EVENT_NAME, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggleCollege = useCallback((slug: string) => {
    const current = readStoredSlugs();

    if (current.includes(slug)) {
      const next = current.filter((item) => item !== slug);
      persistSlugs(next);
      toast({
        title: "College removed",
        description: "The college was removed from your comparison list.",
      });
      return;
    }

    if (current.length >= MAX_COMPARE_ITEMS) {
      toast({
        title: "Compare up to 4 colleges",
        description: "Remove one college first to add another.",
      });
      return;
    }

    const next = [...current, slug];
    persistSlugs(next);
    toast({
      title: "College added",
      description: "Open compare once you have at least two colleges selected.",
    });
  }, []);

  const clearCompare = useCallback(() => {
    persistSlugs([]);
  }, []);

  const removeCollege = useCallback((slug: string) => {
    const next = readStoredSlugs().filter((item) => item !== slug);
    persistSlugs(next);
  }, []);

  return useMemo(
    () => ({
      selectedSlugs,
      selectedCount: selectedSlugs.length,
      isSelected: (slug: string) => selectedSlugs.includes(slug),
      canCompare: selectedSlugs.length >= 2,
      compareHref: buildCollegeCompareHref(selectedSlugs),
      toggleCollege,
      removeCollege,
      clearCompare,
    }),
    [clearCompare, removeCollege, selectedSlugs, toggleCollege],
  );
}
