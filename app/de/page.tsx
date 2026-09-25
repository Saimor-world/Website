import YoriGate from '@/components/YoriGate';
import LivingForestWorld from '@/components/LivingForestWorld';

export const metadata = {
  title: 'Saimôr – Klarheit im Wandel',
  description: 'Saimôr verbindet Arbeit, Daten und KI zu einem System, das Kontext behält. Mit MÔRA, Saimôr OS, YORI sowie ORBIT, PULSE und SYSTEMS.'
};

export default function Page() {
  return (
    <>
      <LivingForestWorld locale="de" />
      <YoriGate locale="de" />
    </>
  );
}
