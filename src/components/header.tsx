// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export default function Header() {
  return (
    <nav class="border-b border-border bg-bg-secondary/50 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" class="flex items-center gap-3 group">
            <span class="text-2xl">🏃</span>
            <span class="font-display font-bold text-xl text-text-primary uppercase tracking-tight group-hover:text-accent transition-colors">
              Waite Workout
            </span>
          </a>

          {/* Navigation */}
          <div class="flex items-center gap-6">
            <a
              href="/"
              class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/strava"
              class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              Activities
            </a>
            <a
              href="/auth/strava"
              class="text-sm font-medium px-4 py-2 rounded-lg bg-accent/10 text-accent
                     hover:bg-accent/20 transition-colors"
            >
              Connect Strava
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
