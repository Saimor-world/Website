import type { Metadata } from "next";
import MoraAnalogAffect from "@/components/MoraAnalogAffect";

export const metadata: Metadata = {
  title: "Môra – Analog Affect",
  description:
    "The Môra Analog Affect page explains how Saimôr OS uses semantic memory – from structured to deep view.",
};

export default function MoraAnalogAffectPage() {
  return <MoraAnalogAffect locale="en" />;
}

