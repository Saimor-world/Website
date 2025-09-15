interface BrandSunProps {
  className?: string;
}

export default function BrandSun({ className = "w-6 h-6" }: BrandSunProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="#FFCE45"
        className="drop-shadow-sm"
      />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        stroke="#FFCE45"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="drop-shadow-sm"
      />
    </svg>
  );
}