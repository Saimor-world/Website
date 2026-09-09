import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

export const metadata: Metadata = {
  title: "YORI — Creative House by Saimôr",
  description: "A calm digital house for creative work: signals, ideas, workshop, crew and business in one connected space.",
};

export default function YoriPage() {
  return <YoriLanding locale="en" />;
}
