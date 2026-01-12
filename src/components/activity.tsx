// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export interface ActivityProps {
  activity: {
    id: number;
    name: string;
    type: string;
    sport_type: string;
    start_date_local: string;
    moving_time: number;
    distance: number;
    average_speed: number;
    total_elevation_gain: number;
    description: string | null;
  };
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

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPace(metersPerSecond: number): string {
  if (metersPerSecond <= 0) return "N/A";
  const paceSeconds = 1000 / metersPerSecond;
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = Math.floor(paceSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")} /km`;
}

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)} km`;
  }
  return `${meters} m`;
}

function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    Run: "▶",
    Ride: "🚴",
    Walk: "🚶",
    Hike: "🥾",
    Swim: "🏊",
    NordicSki: "⛷",
    AlpineSki: "⛷",
    Workout: "💪",
    Yoga: "🧘",
    Elliptical: "🔄",
    Rowing: "🚣",
    VirtualRide: "🚴",
    EBikeRide: "🚴",
  };
  return icons[type] || "◎";
}

export default function Activity({ activity }: ActivityProps) {
  return (
    <a
      href={`https://www.strava.com/activities/${activity.id}`}
      target="_blank"
      rel="noopener noreferrer"
      class="block bg-bg-secondary rounded p-4 hover:bg-opacity-80 transition-all border border-transparent hover:border-accent/30 group"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-start gap-4">
          <span class="text-2xl text-accent w-8 text-center">{getActivityIcon(activity.sport_type)}</span>
          <div>
            <h3 class="font-mono font-semibold text-text-primary group-hover:text-accent transition-colors">
              {activity.name}
            </h3>
            <p class="text-text-secondary text-sm font-mono mt-1">{formatDate(activity.start_date_local)}</p>
          </div>
        </div>
        <div class="flex items-center gap-6 text-right">
          <div>
            <div class="text-text-primary font-mono font-bold">{formatDistance(activity.distance)}</div>
            <div class="text-text-secondary text-xs font-mono">Distance</div>
          </div>
          <div>
            <div class="text-text-primary font-mono font-bold">{formatDuration(activity.moving_time)}</div>
            <div class="text-text-secondary text-xs font-mono">Time</div>
          </div>
          <div>
            <div class="text-text-primary font-mono font-bold">{formatPace(activity.average_speed)}</div>
            <div class="text-text-secondary text-xs font-mono">Pace</div>
          </div>
          <div>
            <div class="text-text-primary font-mono font-bold">{activity.total_elevation_gain}m</div>
            <div class="text-text-secondary text-xs font-mono">Elev</div>
          </div>
        </div>
      </div>
      {activity.description && (
        <p class="text-text-secondary text-sm font-mono mt-3 border-t border-bg-primary/50 pt-3">
          {activity.description}
        </p>
      )}
    </a>
  );
}
