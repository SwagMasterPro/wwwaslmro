import { ButtonHTMLAttributes, forwardRef } from "react";

/**
 * Button Component - Design System v2
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-semibold
      transition-all duration-200 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:pointer-events-none
      select-none
    `;

    const variants = {
      primary: `
        bg-[var(--color-primary-800)] text-white
        hover:bg-[var(--color-primary-700)]
        active:bg-[var(--color-primary-900)]
        focus-visible:ring-[var(--color-primary-500)]
        shadow-sm hover:shadow-md
      `,
      secondary: `
        bg-[var(--color-accent-600)] text-white
        hover:bg-[var(--color-accent-700)]
        active:bg-[var(--color-accent-800)]
        focus-visible:ring-[var(--color-accent-500)]
        shadow-sm hover:shadow-md
      `,
      outline: `
        bg-transparent text-[var(--color-primary-800)]
        border-2 border-[var(--color-primary-800)]
        hover:bg-[var(--color-primary-800)] hover:text-white
        active:bg-[var(--color-primary-900)]
        focus-visible:ring-[var(--color-primary-500)]
      `,
      ghost: `
        bg-transparent text-[var(--color-primary-800)]
        hover:bg-[var(--color-primary-100)]
        active:bg-[var(--color-primary-200)]
        focus-visible:ring-[var(--color-primary-500)]
      `,
      danger: `
        bg-[var(--color-error)] text-white
        hover:bg-red-600
        active:bg-red-700
        focus-visible:ring-red-500
        shadow-sm hover:shadow-md
      `,
    };

    const sizes = {
      sm: "h-8 px-3 text-sm rounded-lg",
      md: "h-10 px-5 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-xl",
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${widthStyle}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        
        {children}
        
        {rightIcon && !isLoading && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
