import type { Metadata } from "next";
import MoraAnalogAffect from "@/components/MoraAnalogAffect";

export const metadata: Metadata = {
  title: "Môra – Analog Affect",
  description:
    "Die Môra-Analog-Affect-Seite erklärt, wie das semantische Gedächtnis von Saimôr OS arbeitet – mit strukturiertem und tiefem View.",
};

export default function MoraAnalogAffectPage() {
  return <MoraAnalogAffect locale="de" />;
}

