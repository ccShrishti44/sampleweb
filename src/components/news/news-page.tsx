"use client";
import Image from "next/image";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { getNewsArticles, getNewsCategories } from "@/lib/services";

const NEWS = getNewsArticles();

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All News");
  const categories = useMemo(() => getNewsCategories(), []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === "All News") {
      return NEWS;
    }

    return NEWS.filter((article) => article.category === activeCategory);
  }, [activeCategory]);

  const featuredArticle =
    filteredArticles.find((article) => article.featured) ?? filteredArticles[0];

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHero
        eyebrow="Latest Education News"
        title="Stay updated|without scanning noise"
        description="Exam notices, admission updates, college developments, and sector shifts organised in a more readable news flow."
        variant="slate"
        stats={[
          ["Coverage", "Exams to policy changes"],
          ["Use", "Quick scan and deeper read"],
          ["Focus", "Student-relevant updates"],
        ]}
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        {featuredArticle && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              href={`/news/${featuredArticle.slug}`}
              className="relative block rounded-3xl overflow-hidden mb-12 md:mb-16 h-[320px] sm:h-[400px] md:h-[500px] group"
            >
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                sizes="100vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end">
                <div className="p-6 md:p-12 max-w-3xl text-white">
                  <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3 md:mb-4 inline-block">
                    Featured
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight mb-3 md:mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="max-w-2xl text-sm md:text-base text-white/80 mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm opacity-80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {featuredArticle.date}
                    </span>
                    <span>{featuredArticle.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="flex gap-4 overflow-x-auto pb-6 mb-8 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredArticles.map((article, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              key={article.id}
              className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all group flex flex-col"
            >
              <Link href={`/news/${article.slug}`} className="flex h-full flex-col">
                <div className="h-44 md:h-48 overflow-hidden relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.date} · {article.readTime}
                  </p>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-6 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-primary font-semibold">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
