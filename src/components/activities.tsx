// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";
import Activity from "./activity";
import StatCard from "./stat-card";

export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  elapsed_time: number;
  moving_time: number;
  distance: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_heartrate: number | null;
  max_heartrate: number | null;
  description: string | null;
  calories: number | null;
  start_latlng: [number, number] | null;
  end_latlng: [number, number] | null;
}

export interface ActivitiesProps {
  activities: StravaActivity[];
  title?: string;
  limit?: number;
  showHighlights?: boolean;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${meters} m`;
}

function calculateHighlights(activities: StravaActivity[]) {
  if (activities.length === 0) return null;

  const runs = activities.filter((a) => a.type === "Run");

  const totalDistance = activities.reduce((sum, a) => sum + a.distance, 0);
  const totalTime = activities.reduce((sum, a) => sum + a.elapsed_time, 0);
  const totalElevation = activities.reduce((sum, a) => sum + a.total_elevation_gain, 0);
  const avgHeartrate =
    activities.filter((a) => a.average_heartrate).reduce((sum, a) => sum + (a.average_heartrate || 0), 0) /
      activities.filter((a) => a.average_heartrate).length || 0;

  const longestRun = runs.length > 0 ? runs.reduce((max, a) => (a.distance > max.distance ? a : max), runs[0]) : null;
  const validRuns = runs.filter((a) => a.average_speed > 0);
  const fastestPace =
    validRuns.length > 0
      ? validRuns.reduce((fastest, a) => (a.average_speed > fastest.average_speed ? a : fastest), validRuns[0])
      : null;

  function formatPace(mps: number): string {
    if (mps <= 0) return "N/A";
    const secs = 1000 / mps;
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")} /km`;
  }

  return {
    totalDistance: formatDistance(totalDistance),
    totalTime: formatDuration(totalTime),
    totalElevation: `${Math.round(totalElevation)} m`,
    avgHeartrate: avgHeartrate > 0 ? `${Math.round(avgHeartrate)} bpm` : "N/A",
    longestRun: longestRun ? formatDistance(longestRun.distance) : "N/A",
    fastestPace: fastestPace ? formatPace(fastestPace.average_speed) : "N/A",
    activityCount: activities.length,
  };
}

export default function Activities({
  activities,
  title,
  limit,
  showHighlights = false,
}: ActivitiesProps) {
  const displayActivities = limit ? activities.slice(0, limit) : activities;
  const highlights = showHighlights ? calculateHighlights(activities) : null;

  return (
    <div class="space-y-8">
      {/* Highlights Stats */}
      {showHighlights && highlights && (
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Activities" value={String(highlights.activityCount)} />
          <StatCard label="Distance" value={highlights.totalDistance} />
          <StatCard label="Time" value={highlights.totalTime} />
          <StatCard label="Elevation" value={highlights.totalElevation} />
          <StatCard label="Longest Run" value={highlights.longestRun} />
          <StatCard label="Avg HR" value={highlights.avgHeartrate} />
        </div>
      )}

      {/* Section Title */}
      {title && (
        <h2 class="font-display font-medium text-2xl text-text-secondary uppercase tracking-wide">{title}</h2>
      )}

      {/* Activity Cards Grid */}
      {displayActivities.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayActivities.map((activity) => (
            <Activity activity={activity} />
          ))}
        </div>
      ) : (
        <div class="text-center py-16 border border-dashed border-border rounded-xl bg-bg-secondary">
          <p class="text-text-muted">No activities found</p>
        </div>
      )}
    </div>
  );
}
