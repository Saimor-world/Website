type Props = { className?: string; title?: string };

/** YORI Enso — offener Pinselkreis mit Jade-Akzent, identisch zur App-Bildmarke. */
export default function YoriMark({ className, title = "YORI" }: Props) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label={title}>
      <title>{title}</title>
      <path
        d="M 57.84 22.59 A 27.5 26.6 0 1 1 46.8 10.87 L 45.77 12.34 A 23.2 23 0 1 0 52.67 24.48 Z"
        fill="currentColor"
      />
      <path
        d="M22.9 43.9 A 15.5 15.5 0 0 1 17.3 33.2"
        fill="none"
        stroke="var(--yori-jade, #3E8F8B)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
