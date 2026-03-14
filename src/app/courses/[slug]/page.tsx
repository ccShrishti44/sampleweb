import { notFound } from "next/navigation";

import CourseDetailPage from "@/components/courses/course-detail-page";
import { getCourseBySlug } from "@/lib/services";

export default async function CourseDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getCourseBySlug(slug)) {
    notFound();
  }

  return <CourseDetailPage slug={slug} />;
}
