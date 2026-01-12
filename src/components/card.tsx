// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export interface CardProps {
  children: any;
  href?: string;
  class?: string;
}

export default function Card({ children, href, class: className = "" }: CardProps) {
  const baseClasses = `block bg-bg-card border border-border rounded-xl p-5
    shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]
    hover:bg-bg-card-hover hover:border-border-hover
    hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)]
    hover:-translate-y-0.5 transition-all duration-200 ${className}`;

  if (href) {
    return (
      <a href={href} class={`group ${baseClasses}`}>
        {children}
      </a>
    );
  }

  return <div class={baseClasses}>{children}</div>;
}
