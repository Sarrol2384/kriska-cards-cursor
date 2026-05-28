/** Skewed wave: blue band → white content */
export function WaveDivider() {
  return (
    <div
      className="pointer-events-none relative z-10 w-full overflow-hidden"
      style={{ height: "2.25rem", marginBottom: "-1px" }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-[-6%] block w-[112%] max-w-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        style={{
          height: "2.75rem",
          transform: "skewY(-6deg)",
          transformOrigin: "bottom center",
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
