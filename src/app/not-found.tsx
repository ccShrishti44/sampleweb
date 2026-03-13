import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-4 flex gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            The page you requested does not exist or its route has changed.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
          >
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
