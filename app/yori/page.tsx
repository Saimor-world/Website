import type { Metadata } from "next";
import YoriGardenArrival from "@/components/YoriGardenArrival";
import YoriLanding from "@/components/YoriLanding";

const description = "Ein ruhiger, japanisch inspirierter Arbeitsraum für Creator: Content, Ideen, Community, Kooperationen und Business in einem zusammenhängenden Haus.";

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
  return (
    <>
      <YoriGardenArrival locale="de" />
      <YoriLanding locale="de" />
    </>
  );
}
