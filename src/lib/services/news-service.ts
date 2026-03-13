import { getNewsArticleBySlug, NEWS } from "@/lib/data";

export function getNewsArticles() {
  return NEWS;
}

export function getNewsCategories() {
  return ["All News", ...new Set(NEWS.map((article) => article.category))];
}

export { getNewsArticleBySlug };
