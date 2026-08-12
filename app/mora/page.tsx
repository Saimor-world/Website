import MoraPageClient from "./MoraPageClient";

export const metadata = {
  title: "Môra – Semantisches Gedächtnis | Saimôr",
  description:
    "Erlebe Môra: Das semantische Gedächtnis von Saimôr. Live-Demo-Dashboard, intelligente Musteranalyse und local-first KI.",
};

export default function MoraPage() {
  return <MoraPageClient />;
}
