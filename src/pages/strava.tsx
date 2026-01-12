import { Html } from "@elysiajs/html";
import Layout from "../components/layout";
import { fetchActivities } from "../services/strava";

interface PageProps {
  activities?: Awaited<ReturnType<typeof fetchActivities>>;
  error?: string;
}

export default function StravaPage({ activities, error }: PageProps) {
  return (
    <Layout>
      <div class="min-h-screen bg-bg-primary text-text-primary p-8">
        <h1 class="text-accent text-4xl font-mono font-bold mb-4">Strava Activities</h1>
        {error && (
          <div class="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-4 font-mono">
            Error: {error}
          </div>
        )}
        {activities ? (
          <pre class="bg-bg-secondary p-4 rounded overflow-auto font-mono text-sm">
            {JSON.stringify(activities, null, 2)}
          </pre>
        ) : (
          <p class="text-text-secondary font-mono">Loading...</p>
        )}
      </div>
    </Layout>
  );
}
