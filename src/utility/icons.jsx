export function AppleIcon({ size = 12, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`fill-white shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

export function GooglePlayIcon({ size = 12, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.18 23.76c.33.19.7.24 1.07.13l12.16-7.02-2.59-2.6-10.64 9.49z" fill="#EA4335" />
      <path d="M22.38 10.39 19.4 8.7l-2.92 2.92 2.93 2.93 2.99-1.71a1.71 1.71 0 0 0 0-2.95z" fill="#FBBC04" />
      <path d="M1.93.59A1.7 1.7 0 0 0 1.5 1.7v20.6c0 .41.14.78.43 1.06L14.07 12 1.93.59z" fill="#4285F4" />
      <path d="M4.25.11 16.41 7.14 13.82 9.73 2.13.19A1.72 1.72 0 0 1 4.25.11z" fill="#34A853" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
