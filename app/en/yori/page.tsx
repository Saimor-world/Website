import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

const description = "YORI connects content, messages, collaborations, dates and ideas into one clear working view for creators.";

export const metadata: Metadata = {
  title: "YORI — Creator OS",
  description,
  keywords: ["YORI", "Creator OS", "Creator Workspace", "Saimôr"],
  robots: { index: false, follow: false },
  alternates: { canonical: "/en/yori" },
  openGraph: {
    title: "YORI — Creator OS",
    description,
    url: "/en/yori",
    siteName: "YORI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YORI — Creator OS",
    description,
  },
};

export default function YoriPage() {
  return <YoriLanding locale="en" />;
}
