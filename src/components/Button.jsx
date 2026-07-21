/*
 * Button.jsx
 * Reusable, styling-consistent button component for CodeMate Resources page.
 * Supports multiple variants (primary, secondary, outline, ghost, light) and sizes.
 */

const Button = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  icon = null,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-sans transition-all duration-300  disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-brand-primary text-black font-semibold hover:bg-brand-primary-dark shadow-lg shadow-brand-primary/10",
    secondary:
      "bg-zinc-100 text-zinc-850 font-semibold hover:bg-zinc-200 border border-zinc-200/80",
    outline:
      "border border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
    ghost: "text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100",
    light: "bg-white text-zinc-900 font-semibold hover:bg-zinc-50 border border-zinc-200/60 shadow-sm",
  };

  const sizes = {
    sm: "text-xs px-4 py-1.5 rounded-full gap-1.5",
    md: "text-sm px-6 py-2 rounded-full gap-2",
    lg: "text-base px-8 py-3 rounded-full gap-2.5",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
};

export default Button;
