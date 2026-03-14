import { COURSES, STREAM_OPTIONS } from "@/lib/data";

export function getCourses() {
  return COURSES;
}

export function getCourseStreams() {
  return STREAM_OPTIONS;
}

export function getCourseBySlug(slug: string) {
  return COURSES.find((course) => course.slug === slug);
}
