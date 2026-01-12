// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <header class="flex flex-col gap-4 mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-text-primary uppercase tracking-tight">
          {title}
        </h1>
        {subtitle && <p class="text-text-secondary mt-2">{subtitle}</p>}
      </div>
      {action && (
        <a
          href={action.href}
          class="inline-flex items-center gap-2 text-sm font-medium text-text-secondary
                 hover:text-accent transition-colors group"
        >
          {action.label}
          <span class="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </a>
      )}
    </header>
  );
}
