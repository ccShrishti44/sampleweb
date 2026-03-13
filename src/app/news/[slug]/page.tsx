import { notFound } from "next/navigation";

import NewsArticlePage from "@/components/news/news-article-page";
import { getNewsArticleBySlug } from "@/lib/services";

export default async function NewsArticleRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!getNewsArticleBySlug(slug)) {
    notFound();
  }

  return <NewsArticlePage slug={slug} />;
}
