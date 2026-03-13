import { notFound } from "next/navigation";

import CollegeDetailPage from "@/components/colleges/college-detail-page";
import { getCollegeBySlug } from "@/lib/services";

export default async function CollegeDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getCollegeBySlug(slug)) {
    notFound();
  }

  return <CollegeDetailPage slug={slug} />;
}
