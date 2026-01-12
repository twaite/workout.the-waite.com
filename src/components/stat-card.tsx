// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export interface StatCardProps {
  label: string;
  value: string;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div class="bg-bg-secondary border border-border rounded-lg p-4 hover:border-border-hover transition-colors">
      <div class="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
      <div class="font-mono font-bold text-xl text-text-primary">{value}</div>
    </div>
  );
}
