import CollegeComparePage from "@/components/colleges/college-compare-page";

export default async function CollegeCompareRoute({
  searchParams,
}: {
  searchParams: Promise<{ items?: string }>;
}) {
  const params = await searchParams;
  const selectedSlugs = params.items
    ? params.items.split(",").map((item) => item.trim()).filter(Boolean)
    : [];

  return <CollegeComparePage selectedSlugs={selectedSlugs} />;
}
