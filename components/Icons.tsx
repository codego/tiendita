type IconProps = {
  className?: string;
  filled?: boolean;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="11" cy="11" r="6.25" />
      <path d="M16.2 16.2 20 20" />
    </svg>
  );
}

export function HeartIcon({ className = "h-6 w-6", filled = false }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-6.5-4.2-8.7-7.6C1.6 9.8 2.7 6.5 5.6 5.6c1.6-.5 3.4.1 4.4 1.5 1-1.4 2.8-2 4.4-1.5 2.9.9 4 4.2 2.3 6.8C18.5 15.8 12 20 12 20z" />
    </svg>
  );
}

export function HomeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M4.5 11.2 12 4.8l7.5 6.4" />
      <path d="M6.2 10.4V19h11.6v-8.6" />
    </svg>
  );
}

export function GridIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="4.5" y="4.5" width="6.2" height="6.2" />
      <rect x="13.3" y="4.5" width="6.2" height="6.2" />
      <rect x="4.5" y="13.3" width="6.2" height="6.2" />
      <rect x="13.3" y="13.3" width="6.2" height="6.2" />
    </svg>
  );
}

export function BackIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M15.2 5.5 8.7 12l6.5 6.5" />
    </svg>
  );
}
