/**
 * Hidden SVG filter that roughens the alpha edges of whatever it is applied to,
 * producing an organic torn-paper outline. Applied via the `.parchment-torn`
 * utility to a background-only layer.
 */
export function TornFilter() {
  return (
    <svg
      aria-hidden
      width="0"
      height="0"
      className="pointer-events-none absolute"
      style={{ position: 'absolute' }}
    >
      <defs>
        <filter id="paper-torn" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.014 0.018"
            numOctaves={3}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={16}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}
