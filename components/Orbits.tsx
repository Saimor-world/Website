'use client';

interface OrbitsProps {
  className?: string;
}

export default function Orbits({ className = "absolute inset-0" }: OrbitsProps) {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {/* Large orbit */}
      <circle
        cx="400"
        cy="300"
        r="200"
        stroke="#F9E79F"
        strokeWidth="1"
        fill="none"
        opacity="0.1"
        strokeDasharray="4 8"
      />

      {/* Medium orbit */}
      <circle
        cx="400"
        cy="300"
        r="120"
        stroke="#F9E79F"
        strokeWidth="1"
        fill="none"
        opacity="0.15"
        strokeDasharray="2 6"
      />

      {/* Small orbit */}
      <circle
        cx="400"
        cy="300"
        r="60"
        stroke="#F9E79F"
        strokeWidth="1"
        fill="none"
        opacity="0.2"
      />

      {/* Orbital dots */}
      <circle cx="600" cy="300" r="2" fill="#F9E79F" opacity="0.6">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 400 300;360 400 300"
          dur="120s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="520" cy="300" r="1.5" fill="#F9E79F" opacity="0.4">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 400 300;-360 400 300"
          dur="80s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="460" cy="300" r="1" fill="#F9E79F" opacity="0.3">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 400 300;360 400 300"
          dur="40s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}