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
    <Layout
      title="Activities"
      subtitle="Your recent workouts and training data"
      action={{ label: "Re-authenticate", href: "/auth/strava" }}
    >
      {error && (
        <div class="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-lg mb-8">
          <span class="text-red-400">⚠</span>
          <span>
            <strong class="font-semibold">Error:</strong> {error}
          </span>
        </div>
      )}

      {activities ? (
        <Activities activities={activities} showHighlights={true} />
      ) : (
        <div class="flex items-center justify-center py-20">
          <div class="text-text-muted animate-pulse">Loading activities...</div>
        </div>
      )}
    </Layout>
  );
}
