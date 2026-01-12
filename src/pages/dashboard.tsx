// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";
import Layout from "../components/layout";
import Section from "../components/section";
import Card from "../components/card";
import Activities from "../components/activities";
import type { StravaActivity } from "../components/activities";

interface PageProps {
  activities?: StravaActivity[];
  error?: string;
}

export default function Dashboard({ activities, error }: PageProps) {
  return (
    <Layout title="Dashboard" subtitle="Your fitness at a glance">
      {error && error.includes("tokens") ? (
        <div class="bg-bg-secondary border border-accent/30 text-text-secondary p-4 rounded-lg mb-8">
          <span class="text-accent">Strava not connected.</span>{" "}
          <a href="/auth/strava" class="underline hover:text-accent">
            Connect Strava
          </a>{" "}
          to sync your activities.
        </div>
      ) : (
        error && (
          <div class="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-200 p-4 rounded-lg mb-8">
            <span class="text-red-400">⚠</span>
            <span>
              <strong class="font-semibold">Error:</strong> {error}
            </span>
          </div>
        )
      )}

      <Section title="Recent Activity" action={{ label: "View all", href: "/strava" }}>
        {activities ? (
          <Activities activities={activities} limit={3} showHighlights={true} />
        ) : (
          <div class="text-center py-12 border border-dashed border-border rounded-xl bg-bg-secondary">
            <p class="text-text-muted">Connect Strava to see your activities</p>
          </div>
        )}
      </Section>

      <Section title="Quick Actions">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card href="/strava">
            <h3 class="font-display font-medium text-lg text-text-primary mb-2 group-hover:text-accent transition-colors">
              View All Activities
            </h3>
            <p class="text-text-secondary text-sm">Browse your complete workout history</p>
          </Card>
          <Card href="/auth/strava">
            <h3 class="font-display font-medium text-lg text-text-primary mb-2 group-hover:text-accent transition-colors">
              Connect Strava
            </h3>
            <p class="text-text-secondary text-sm">Sync your activities from Strava</p>
          </Card>
        </div>
      </Section>
    </Layout>
  );
}
