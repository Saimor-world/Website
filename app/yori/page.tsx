import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

const description = "YORI verbindet Content, Nachrichten, Kooperationen, Termine und Ideen zu einer klaren Arbeitslage für Creator.";

export const metadata: Metadata = {
  title: "YORI — Creator OS",
  description,
  keywords: ["YORI", "Creator OS", "Creator Workspace", "Saimôr"],
  robots: { index: false, follow: false },
  alternates: { canonical: "/yori" },
  openGraph: {
    title: "YORI — Creator OS",
    description,
    url: "/yori",
    siteName: "YORI",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YORI — Creator OS",
    description,
  },
};

export default function YoriPage() {
  return <YoriLanding locale="de" />;
}
