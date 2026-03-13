import CollegesPage from "@/components/colleges/colleges-page";

export default async function CollegesRoute({
  searchParams,
}: {
  searchParams: Promise<{ stream?: string }>;
}) {
  const params = await searchParams;

  return <CollegesPage presetStream={params.stream} />;
}
