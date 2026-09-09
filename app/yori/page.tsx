import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

const description = "YORI bündelt Content, Ideen, Community, Kooperationen und Business für Creator an einem Ort.";

export const metadata: Metadata = {
  title: "YORI — Creative House",
  description,
  keywords: ["YORI", "Creative House", "Creator Workspace", "Saimôr"],
  robots: { index: false, follow: false },
  alternates: { canonical: "/yori" },
  openGraph: {
    title: "YORI — Creative House",
    description,
    url: "/yori",
    siteName: "YORI",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YORI — Creative House",
    description,
  },
};

export default function YoriPage() {
  return <YoriLanding locale="de" />;
}
