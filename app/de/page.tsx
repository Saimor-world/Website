import CreatorSignalEgg from '@/components/CreatorSignalEgg';
import LivingForestWorld from '@/components/LivingForestWorld';

export const metadata = {
  title: 'Saimôr – OS, Môra und souveräne KI-Systeme',
  description: 'Saimôr verbindet digitalen Arbeitsraum, Daten und KI zu einem System, das Kontext behält. Mit Saimôr OS, Môra, Vorträgen, Schulungen und Prototypen.',
};

export default function Page() {
  return (
    <>
      <LivingForestWorld locale="de" />
      <CreatorSignalEgg locale="de" />
    </>
  );
}
