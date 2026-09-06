import MoraProductPage from '@/components/MoraProductPage';

export const metadata = {
  title: 'Môra – proaktive Assistenz im Saimôr OS',
  description:
    'Môra ist die proaktive Assistenz im Saimôr OS: Sie hält Kontext, erkennt relevante Signale, bereitet nächste Schritte vor und kann über Systemfähigkeiten handeln.',
};

export default function MoraPage() {
  return <MoraProductPage locale="de" />;
}
