import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

export const metadata: Metadata = {
  title: "YORI — Creative House",
  description: "Ein ruhiger, japanisch inspirierter Arbeitsraum für Creator: Content, Ideen, Community, Kooperationen und Business in einem zusammenhängenden Haus.",
  robots: { index: false, follow: false },
};

export default function YoriPage() {
  return <YoriLanding locale="de" />;
}
