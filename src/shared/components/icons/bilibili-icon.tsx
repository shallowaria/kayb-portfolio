import * as React from 'react'

/** Bilibili glyph — lucide has no b-station icon, so we inline a clean one. */
export function BilibiliIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M7 4l2.5 2.5M17 4l-2.5 2.5" />
      <rect x="3" y="6.5" width="18" height="13" rx="3" />
      <path d="M8.5 11.5v2M15.5 11.5v2" />
    </svg>
  )
}
