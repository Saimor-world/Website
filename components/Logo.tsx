export default function Logo({ className }: { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      {/* Golden Triangle */}
      <div
        className="w-6 h-6 triangle"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          backgroundColor: '#F9E79F'
        }}
      />
      {/* Original SVG Logo */}
      <svg viewBox="0 0 64 64" className={className}>
        <circle cx="32" cy="32" r="24" fill="#85A389" stroke="#F9E79F" strokeWidth="2"/>
        <circle cx="32" cy="24" r="6" fill="#F9E79F"/>
        <path d="M16 40c8 6 24 6 32 0" stroke="#F9E79F" strokeWidth="2" fill="none"/>
      </svg>
    </div>
  );
}
