'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SystemsPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Systems is now integrated into Môra
    // Redirect to Môra Showcase section
    router.push('/de#mora-showcase');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A6741] to-[#D4B483]">
      <div className="text-center text-white">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="text-xl font-semibold">
          Systems ist jetzt Teil von Môra...
        </p>
        <p className="text-sm opacity-80 mt-2">
          Du wirst weitergeleitet
        </p>
      </div>
    </div>
  );
}
