'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SystemsPage() {
  const router = useRouter();

  useEffect(() => {
    // Systems ist jetzt in Môra integriert - redirect zur Hauptseite
    router.replace('/#waitlist');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center">
        <p className="text-slate-600">Redirecting to Môra...</p>
      </div>
    </div>
  );
}
