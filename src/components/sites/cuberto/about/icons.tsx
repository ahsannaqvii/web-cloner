/** Line icons from the "Benefits of working with us" rows, copied from cuberto.com/about. */
export function BenefitIcon({ name }: { name: "polygon" | "burst" | "cross" | "rings" }) {
  switch (name) {
    case "polygon":
      return (
        <svg fill="none" viewBox="0 0 80 80" aria-hidden>
          <path
            stroke="currentColor"
            strokeWidth="4"
            d="M22.72 71.22a9 9 0 0 0 8.36 3.33l27.32-3.97A9 9 0 0 0 65.46 65l10.22-25.64a9 9 0 0 0-1.3-8.9L57.29 8.77a9 9 0 0 0-8.36-3.33L21.6 9.42a9 9 0 0 0-7.06 5.57L4.32 40.64a9 9 0 0 0 1.3 8.9l17.1 21.68Z"
          />
          <path stroke="currentColor" strokeWidth="4" d="m27.21 23.61 5.13 35.6L60.56 36.9 27.2 23.6Z" />
          <path stroke="currentColor" strokeWidth="4.08" d="m26.97 72.69 6.11-15.62" />
          <path stroke="currentColor" strokeWidth="4.08" d="m59.39 37.31 15.59-2.92" />
          <path stroke="currentColor" strokeWidth="4.08" d="m18.46 11.87 9.67 12.62" />
        </svg>
      );
    case "burst":
      return (
        <svg viewBox="0 0 65 65" aria-hidden>
          <path
            fill="currentColor"
            d="m34.2 25.05-1.7-13.26-1.7 13.26-7.28-11.2 4.22 12.68-11.43-6.94 9.3 9.6-13.3-1.3 12.55 4.61-12.55 4.6 13.3-1.28-9.3 9.6 11.43-6.95-4.22 12.69 7.28-11.21 1.7 13.26 1.7-13.26 7.28 11.2-4.22-12.68 11.43 6.94-9.3-9.6 13.3 1.3-12.55-4.61 12.55-4.6-13.3 1.28 9.3-9.6-11.43 6.95 4.23-12.69-7.29 11.21ZM46.6 3.22l-6.62 19.9L57.9 12.24 43.31 27.3l20.88-2.03-19.7 7.23 19.7 7.23L43.3 37.7l14.6 15.06-17.93-10.88 6.62 19.9L35.17 44.2 32.5 65l-2.67-20.8L18.4 61.77l6.62-19.9L7.1 52.76 21.7 37.7.82 39.73l19.7-7.23L.8 25.27 21.7 27.3 7.1 12.24l17.92 10.88-6.62-19.9L29.83 20.8 32.5 0l2.67 20.8L46.6 3.23Z"
          />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 64 64" aria-hidden>
          <rect x="16" y="2" width="32" height="60" rx="16" fill="none" stroke="currentColor" strokeWidth="4" />
          <rect
            x="2"
            y="48"
            width="32"
            height="60"
            rx="16"
            fill="none"
            transform="rotate(-90 2 48)"
            stroke="currentColor"
            strokeWidth="4"
          />
        </svg>
      );
    case "rings":
      return (
        <svg fill="none" viewBox="0 0 80 80" aria-hidden>
          <path
            stroke="currentColor"
            strokeWidth="4"
            d="M44.95 77.68A38.02 38.02 0 0 1 2.32 44.95 38.02 38.02 0 0 1 35.05 2.32a38.02 38.02 0 0 1 42.63 32.73 38.02 38.02 0 0 1-32.73 42.63Z"
          />
          <path stroke="currentColor" strokeWidth="4" d="M44.95 77.68a25.01 25.01 0 0 1-6.51-49.58 25.01 25.01 0 0 1 6.51 49.58Z" />
          <path stroke="currentColor" strokeWidth="4" d="M41.56 51.9a25.01 25.01 0 0 1-6.51-49.58 25.01 25.01 0 0 1 6.51 49.58Z" />
        </svg>
      );
  }
}
