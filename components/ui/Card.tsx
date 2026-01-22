import { ReactNode, HTMLAttributes } from "react";

/**
 * Card Component - Design System v2
 */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "elevated" | "interactive" | "ghost";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  as?: "div" | "article" | "section";
}

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
  as: Component = "div",
  ...props
}: CardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };

  const variantStyles = {
    default: `
      bg-[var(--surface-primary)]
      border border-[var(--border-primary)]
      rounded-xl
    `,
    elevated: `
      bg-[var(--surface-elevated)]
      rounded-xl
      shadow-[var(--shadow-md)]
    `,
    interactive: `
      bg-[var(--surface-primary)]
      border border-[var(--border-primary)]
      rounded-xl
      transition-all duration-200 ease-out
      hover:border-[var(--color-primary-300)]
      hover:shadow-[var(--shadow-lg)]
      hover:-translate-y-0.5
      cursor-pointer
    `,
    ghost: `
      bg-transparent
      rounded-xl
    `,
  };

  return (
    <Component
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = "", actions }: { children: ReactNode; className?: string; actions?: ReactNode }) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>
      <div className="flex-1 min-w-0">{children}</div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

export function CardTitle({ children, className = "", as: Component = "h3" }: { children: ReactNode; className?: string; as?: "h2" | "h3" | "h4" | "h5" }) {
  const sizeMap = {
    h2: "text-2xl",
    h3: "text-xl",
    h4: "text-lg",
    h5: "text-base",
  };

  return (
    <Component
      className={`
        font-heading font-semibold
        text-[var(--color-primary-900)]
        ${sizeMap[Component]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

export function CardDescription({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-[var(--text-secondary)] mt-1 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = "", bordered = true }: { children: ReactNode; className?: string; bordered?: boolean }) {
  return (
    <div
      className={`
        mt-6 pt-4
        ${bordered ? "border-t border-[var(--border-primary)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
