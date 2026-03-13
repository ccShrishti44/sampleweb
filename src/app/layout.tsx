import type { Metadata } from "next";

import "@/index.css";
import { Layout } from "@/components/layout";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
  title: "EduExpert",
  description: "College discovery, courses, admissions, scholarships, and education news.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
