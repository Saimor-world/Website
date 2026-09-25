import YoriGate from '@/components/YoriGate';
import LivingForestWorld from '@/components/LivingForestWorld';

export const metadata = {
  title: 'Saimôr – Clarity through change',
  description: 'Saimôr connects work, data and AI into a system that keeps context. With MÔRA, Saimôr OS, YORI plus consulting, workshops and implementation.'
};

export default function Page() {
  return (
    <>
      <LivingForestWorld locale="en" />
      <YoriGate locale="en" />
    </>
  );
}
