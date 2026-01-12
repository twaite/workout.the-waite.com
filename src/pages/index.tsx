/* eslint-disable @typescript-eslint/no-unused-vars */
import { Html } from "@elysiajs/html";
/* eslint-enable @typescript-eslint/no-unused-vars */
import Layout from "../components/layout";
import Activities from "../components/activities";
import type { StravaActivity } from "../components/activities";

interface PageProps {
  activities?: StravaActivity[];
  error?: string;
}

export default function Page({ activities, error }: PageProps) {
  return (
    <Layout>
      <div class="min-h-screen bg-bg-primary text-text-primary p-8">
        <div class="max-w-4xl mx-auto">
          <div class="mb-8">
            <h1 class="text-accent text-4xl font-mono font-bold mb-2">Workout App</h1>
            <p class="text-text-secondary font-mono">Developer-focused tracking</p>
          </div>

          {error && error.includes("tokens") ? (
            <div class="bg-bg-secondary border border-accent/30 text-text-secondary p-4 rounded mb-6 font-mono text-sm">
              <span class="text-accent">Strava not connected.</span>{" "}
              <a href="/auth/strava" class="underline hover:text-accent">Connect Strava</a> to sync your activities.
            </div>
          ) : error && (
            <div class="bg-red-900/20 border border-red-500/50 text-red-200 p-4 rounded mb-6 font-mono text-sm">
              <span class="font-bold">Error:</span> {error}
            </div>
          )}

          <div class="space-y-8">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-mono font-bold text-accent">Recent Activity</h2>
                <a href="/strava" class="text-sm font-mono text-text-secondary hover:text-accent transition-colors">
                  View all →
                </a>
              </div>
              {activities ? (
                <Activities activities={activities} limit={3} showHighlights={true} />
              ) : (
                <div class="text-center py-8 text-text-secondary font-mono">
                  Connect Strava to see your activities
                </div>
              )}
            </div>

            <div class="border-t border-bg-secondary pt-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="/strava"
                  class="block bg-bg-secondary rounded p-6 hover:bg-opacity-80 transition-all border border-transparent hover:border-accent/30"
                >
                  <h3 class="text-lg font-mono font-bold text-text-primary mb-2">View All Activities</h3>
                  <p class="text-text-secondary text-sm font-mono">Browse your complete workout history</p>
                </a>
                <a
                  href="/auth/strava"
                  class="block bg-bg-secondary rounded p-6 hover:bg-opacity-80 transition-all border border-transparent hover:border-accent/30"
                >
                  <h3 class="text-lg font-mono font-bold text-text-primary mb-2">Connect Strava</h3>
                  <p class="text-text-secondary text-sm font-mono">Sync your activities from Strava</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
