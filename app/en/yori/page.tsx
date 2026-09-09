import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

export const metadata: Metadata = {
  title: "YORI — Creative House",
  description: "A calm, Japanese-inspired workspace for creators: content, ideas, community, collaborations and business in one connected house.",
  robots: { index: false, follow: false },
};

export default function YoriPage() {
  return <YoriLanding locale="en" />;
}
