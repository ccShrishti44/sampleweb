"use client";
import Image from "next/image";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { getNewsArticleBySlug, getNewsArticles } from "@/lib/services";

export default function NewsArticleDetail({ slug }: { slug: string }) {
  const NEWS = getNewsArticles();
  const article = getNewsArticleBySlug(slug);

  if (!article) return null;

  const relatedArticles = NEWS.filter(
    (item) => item.slug !== article.slug && item.category === article.category,
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        variant="slate"
        stats={[
          ["Published", article.date],
          ["Read time", article.readTime],
          ["Category", article.category],
        ]}
      >
        <Image
          src={article.image}
          alt={article.title}
          width={1200}
          height={352}
          className="h-44 w-full rounded-[28px] object-cover shadow-lg"
        />
      </PageHero>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-14">
        <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to news
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-[30px] border border-border bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>

            <div className="mt-8 rounded-[24px] bg-muted/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Key takeaways
              </p>
              <ul className="mt-4 space-y-3">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex items-start gap-2 text-sm leading-6 text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 space-y-10">
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Related coverage
              </p>
              <div className="mt-4 space-y-4">
                {relatedArticles.map((item) => (
                  <Link key={item.slug} href={`/news/${item.slug}`} className="block rounded-2xl border border-border p-4 hover:border-primary/40 transition-colors">
                    <p className="text-xs font-semibold text-primary">{item.category}</p>
                    <h3 className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">{item.date}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
