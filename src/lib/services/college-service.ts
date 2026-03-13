import { COLLEGES, getCollegeBySlug, STREAM_OPTIONS } from "@/lib/data";

export function getColleges() {
  return COLLEGES;
}

export function getCollegeStreams() {
  return STREAM_OPTIONS;
}

export { getCollegeBySlug };
