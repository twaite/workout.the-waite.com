// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";
import Activity from "./activity";

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
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m ${secs}s`;
}

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
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

export default function Activities({ activities, title = "Activities", limit, showHighlights = false }: ActivitiesProps) {
  const displayActivities = limit ? activities.slice(0, limit) : activities;
  const highlights = showHighlights ? calculateHighlights(activities) : null;

  return (
    <div class="space-y-6">
      {title && <h2 class="text-2xl font-mono font-bold text-accent">{title}</h2>}

      {showHighlights && highlights && (
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div class="bg-bg-secondary rounded p-4">
            <div class="text-text-secondary text-xs uppercase tracking-wider">Activities</div>
            <div class="text-xl font-mono font-bold text-text-primary">{highlights.activityCount}</div>
          </div>
          <div class="bg-bg-secondary rounded p-4">
            <div class="text-text-secondary text-xs uppercase tracking-wider">Distance</div>
            <div class="text-xl font-mono font-bold text-text-primary">{highlights.totalDistance}</div>
          </div>
          <div class="bg-bg-secondary rounded p-4">
            <div class="text-text-secondary text-xs uppercase tracking-wider">Time</div>
            <div class="text-xl font-mono font-bold text-text-primary">{highlights.totalTime}</div>
          </div>
          <div class="bg-bg-secondary rounded p-4">
            <div class="text-text-secondary text-xs uppercase tracking-wider">Elevation</div>
            <div class="text-xl font-mono font-bold text-text-primary">{highlights.totalElevation}</div>
          </div>
          <div class="bg-bg-secondary rounded p-4">
            <div class="text-text-secondary text-xs uppercase tracking-wider">Longest Run</div>
            <div class="text-xl font-mono font-bold text-text-primary">{highlights.longestRun}</div>
          </div>
          <div class="bg-bg-secondary rounded p-4">
            <div class="text-text-secondary text-xs uppercase tracking-wider">Avg HR</div>
            <div class="text-xl font-mono font-bold text-text-primary">{highlights.avgHeartrate}</div>
          </div>
        </div>
      )}

      <div class="space-y-3">
        {displayActivities.map((activity) => (
          <Activity activity={activity} />
        ))}
      </div>

      {activities.length === 0 && (
        <div class="text-center py-12 text-text-secondary font-mono">
          No activities found
        </div>
      )}
    </div>
  );
}
