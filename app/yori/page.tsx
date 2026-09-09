import type { Metadata } from "next";
import YoriLanding from "@/components/YoriLanding";

export const metadata: Metadata = {
  title: "YORI — Creative House by Saimôr",
  description: "Ein ruhiges digitales Haus für kreative Arbeit: Signale, Ideen, Werkstatt, Crew und Geschäft in einem zusammenhängenden Raum.",
};

export default function YoriPage() {
  return <YoriLanding locale="de" />;
}
