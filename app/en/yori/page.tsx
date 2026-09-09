import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

const description = "YORI brings content, ideas, community, collaborations and business together for creators in one place.";

export const metadata: Metadata = {
  title: "YORI — Creative House",
  description,
  keywords: ["YORI", "Creative House", "Creator Workspace", "Saimôr"],
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/yori" },
  openGraph: {
    title: "YORI — Creative House",
    description,
    url: "/en/yori",
    siteName: "YORI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YORI — Creative House",
    description,
  },
};

export default function YoriPage() {
  return <YoriLanding locale="en" />;
}
