// Continuous right-to-left logo strip. The track holds the list twice so the
// second copy slides in exactly as the first leaves; translating -50% lands on
// a frame identical to the start, which makes the loop seamless.
export default function BrandMarquee({ brands, label = "Supported brands" }) {
  const loop = [...brands, ...brands];

  return (
    <div>
      <p className="text-center font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        {label}
      </p>

      <div
        aria-label={`${label}: ${brands.map((b) => b.name).join(", ")}`}
        className="logo-marquee mt-6"
        role="group"
        style={{ "--marquee-duration": `${brands.length * 5}s` }}
      >
        <ul className="logo-marquee-track">
          {loop.map((brand, index) => (
            <li
              aria-hidden={index >= brands.length ? "true" : undefined}
              className="logo-chip"
              key={`${brand.name}-${index}`}
            >
              <img
                alt={index >= brands.length ? "" : brand.name}
                className="logo-chip-img"
                loading="lazy"
                src={brand.logo}
                style={{ "--logo-w": `${brand.w}px`, "--logo-h": `${brand.h}px` }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
