import { Link } from "react-router-dom";

/* The site's one button. Geometry and type are fixed here so every call site
 * gets the hero's CTA shape — square, mono, tracked caps — and only the skin
 * varies by variant (see styles/buttons.css).
 *
 * DM Mono ships no weight above 500 and `font-synthesis: none` is set on body,
 * so `font-medium` is the heaviest weight that actually renders. */
const VARIANTS = {
  primary: "button-primary",
  secondary: "button-secondary",
  quiet: "button-quiet",
  onAmber: "button-on-amber",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border px-7 py-3 " +
  "font-mono text-[12px] font-medium uppercase tracking-[0.22em] " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50";

export default function Button({
  children,
  href,
  to,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`;

  if (to && !disabled) {
    return (
      <Link className={classes} to={to} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a className={classes} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
