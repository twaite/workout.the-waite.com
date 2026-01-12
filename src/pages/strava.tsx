// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";
import Layout from "../components/layout";
import Activities from "../components/activities";
import type { StravaActivity } from "../components/activities";

interface PageProps {
  activities?: StravaActivity[];
  error?: string;
}

export default function StravaPage({ activities, error }: PageProps) {
  return (
    <Layout>
      <div class="min-h-screen bg-bg-primary text-text-primary p-8">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-accent text-4xl font-mono font-bold">Strava Activities</h1>
            <a
              href="/auth/strava"
              class="text-sm font-mono text-text-secondary hover:text-accent transition-colors"
            >
              Re-authenticate →
            </a>
          </div>

          {error && (
            <div class="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded mb-6 font-mono text-sm">
              <span class="font-bold">Error:</span> {error}
            </div>
          )}

          {activities ? (
            <Activities activities={activities} showHighlights={true} />
          ) : (
            <div class="text-center py-12 text-text-secondary font-mono">Loading...</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
