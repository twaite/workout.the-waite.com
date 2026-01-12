// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer class="border-t border-border bg-bg-secondary/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2 text-text-muted text-sm">
            <span>Built with</span>
            <span class="text-accent">Bun</span>
            <span>+</span>
            <span class="text-accent">Elysia</span>
          </div>
          <div class="text-text-muted text-sm">&copy; {year} the-waite.com</div>
        </div>
      </div>
    </footer>
  );
}
