import type { Metadata } from "next";
import { NotFound } from "@/components/ui/not-found-2";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Nooes",
  description: "The page you're looking for might have been moved or doesn't exist.",
};

export default function GlobalNotFound() {
  return <NotFound />;
}

