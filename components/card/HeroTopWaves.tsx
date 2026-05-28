/**
 * White wave accent — top-left, same path & skew direction as WaveDivider.
 */
export function HeroTopWaves() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 z-0 w-full overflow-hidden"
      style={{ height: "2.75rem" }}
      aria-hidden
    >
      <svg
        className="absolute top-0 left-[-6%] block w-[112%] max-w-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{
          height: "2.75rem",
          transform: "skewY(-6deg)",
          transformOrigin: "top left",
        }}
      >
        <path
          fill="#ffffff"
          d="M0,58 C280,98 520,22 760,52 C1000,82 1240,38 1440,48 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}
