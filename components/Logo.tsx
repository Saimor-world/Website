export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <circle cx="32" cy="32" r="24" fill="#0E1526" stroke="#FFCE45" strokeWidth="2"/>
      <circle cx="32" cy="24" r="6" fill="#FFCE45"/>
      <path d="M16 40c8 6 24 6 32 0" stroke="#FFCE45" strokeWidth="2" fill="none"/>
    </svg>
  );
}
