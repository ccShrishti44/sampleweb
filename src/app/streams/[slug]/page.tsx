import { notFound } from "next/navigation";

import StreamDetailPage from "@/components/streams/stream-detail-page";
import { getStreamPageBySlug } from "@/lib/services";

export default async function StreamDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getStreamPageBySlug(slug)) {
    notFound();
  }

  return <StreamDetailPage slug={slug} />;
}
