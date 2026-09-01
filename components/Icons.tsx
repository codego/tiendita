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

export function HangerIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M12 4.8c.9 0 1.5.6 1.5 1.4 0 .6-.3 1-.9 1.3L12 8.2 4.8 18.4h14.4" />
      <path d="M4.2 18.4h15.6" />
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

export function CloudIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M7.2 18.5h9.1c2.2 0 3.9-1.7 3.9-3.7 0-1.9-1.5-3.5-3.4-3.7.1-2.5-1.9-4.6-4.4-4.6-2.1 0-3.9 1.4-4.4 3.4-1.8.2-3.2 1.7-3.2 3.5 0 2 1.6 5.1 2.4 5.1z" />
    </svg>
  );
}

export function LinkIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M9.2 14.8 14.8 9.2" />
      <path d="M10.6 8.2 12.4 6.4a3.3 3.3 0 1 1 4.7 4.7l-1.8 1.8" />
      <path d="M13.4 15.8 11.6 17.6a3.3 3.3 0 1 1-4.7-4.7l1.8-1.8" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.4" cy="7.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M6.2 17.6 5.4 20.4l2.9-.8A8.2 8.2 0 1 0 6.2 17.6z" />
      <path d="M9.2 9.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .5.4.2.6.6 1.9.6 2 0 .2 0 .4-.2.6l-.4.5c-.1.1-.2.3 0 .6.3.4.8 1 1.4 1.5.6.5 1 .7 1.3.6.2 0 .5-.2.6-.4l.5-.6c.2-.2.4-.2.6-.1.3.1 1.6.8 1.9 1 .2.1.3.2.4.4 0 .3 0 1.1-.5 1.6-.5.6-1.3.7-1.8.7-1.2 0-3.3-.6-5-2.2-1.5-1.4-2.4-3.1-2.5-4.5 0-.8.3-1.5.7-1.8z" />
    </svg>
  );
}

export function MoreIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="6.5" cy="12" r="1.3" fill="currentColor" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <circle cx="17.5" cy="12" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M5 7.5h14" />
      <path d="M5 12h14" />
      <path d="M5 16.5h14" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M9 5.5 15.5 12 9 18.5" />
    </svg>
  );
}
