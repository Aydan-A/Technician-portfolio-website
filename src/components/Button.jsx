import { Link } from "react-router-dom";

const styles = {
  primary: "button-primary",
  secondary: "button-secondary",
  glass: "button-glass",
  light: "button-light",
};

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
  const classes = `inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${className}`;

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
