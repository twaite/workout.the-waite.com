// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export interface SectionProps {
  title: string;
  children: any;
  action?: {
    label: string;
    href: string;
  };
}

export default function Section({ title, children, action }: SectionProps) {
  return (
    <section class="mt-8 first:mt-0">
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-display font-medium text-2xl text-text-secondary uppercase tracking-wide">
          {title}
        </h2>
        {action && (
          <a
            href={action.href}
            class="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent transition-colors group"
          >
            {action.label}
            <span class="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}
