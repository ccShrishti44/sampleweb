import { COLLEGES, getCollegeBySlug, STREAM_OPTIONS } from "@/lib/data";
import type { CollegeCompareField } from "@/lib/types/content";

export function getColleges() {
  return COLLEGES;
}

export function getCollegeStreams() {
  return STREAM_OPTIONS;
}

export function getCollegesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getCollegeBySlug(slug))
    .filter((college): college is NonNullable<typeof college> => Boolean(college));
}

export const COLLEGE_COMPARE_FIELDS: CollegeCompareField[] = [
  { key: "rank", label: "Rank", getValue: (college) => college.rank },
  { key: "rating", label: "Rating", getValue: (college) => `${college.rating} / 5` },
  { key: "location", label: "Location", getValue: (college) => college.location },
  { key: "ownership", label: "Ownership", getValue: (college) => college.ownership },
  { key: "established", label: "Established", getValue: (college) => college.established },
  { key: "fees", label: "Annual fees", getValue: (college) => college.fees },
  { key: "hostel", label: "Hostel fee", getValue: (college) => college.avgHostelFee },
  { key: "cutoff", label: "Admission route", getValue: (college) => college.cutoff },
  {
    key: "exams",
    label: "Exams accepted",
    type: "list",
    getValue: (college) => college.examsAccepted,
  },
  { key: "placement", label: "Placement rate", getValue: (college) => college.placementRate },
  { key: "median-package", label: "Median package", getValue: (college) => college.medianPackage },
  { key: "campus-size", label: "Campus size", getValue: (college) => college.campusSize },
  {
    key: "approvals",
    label: "Approvals",
    type: "list",
    getValue: (college) => college.approvedBy,
  },
  {
    key: "top-programs",
    label: "Top programmes",
    type: "list",
    getValue: (college) => college.topPrograms.slice(0, 4),
  },
  {
    key: "highlights",
    label: "Why shortlist",
    type: "list",
    getValue: (college) => college.highlights.slice(0, 3),
  },
];

export { getCollegeBySlug };
