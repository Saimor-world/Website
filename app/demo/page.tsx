import dynamic from 'next/dynamic';

const DemoContent = dynamic(() => import('@/components/DemoContent'), { ssr: false });

export const metadata = {
  title: 'Môra Live Demo – Saimôr',
  description: 'Erlebe das semantische Dashboard live. Analysiere Daten in Echtzeit und entdecke die Möglichkeiten von Môra.',
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#081410] text-white">
      <DemoContent />
    </main>
  );
}
