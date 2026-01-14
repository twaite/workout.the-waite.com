// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export interface ActivityProps {
  activity: {
    id: number;
    name: string;
    type: string;
    sport_type: string;
    start_date: string;
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
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatPace(metersPerSecond: number): string {
  if (metersPerSecond <= 0) return "N/A";
  const paceSeconds = 1000 / metersPerSecond;
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = Math.floor(paceSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(2)}`;
  }
  return `${meters}`;
}

function getActivityIcon(type: string): string {
  const icons: Record<string, string> = {
    Run: "🏃",
    Ride: "🚴",
    Walk: "🚶",
    Hike: "🥾",
    Swim: "🏊",
    NordicSki: "⛷️",
    AlpineSki: "⛷️",
    Workout: "💪",
    Yoga: "🧘",
    Elliptical: "🔄",
    Rowing: "🚣",
    VirtualRide: "🚴",
    EBikeRide: "🚴",
  };
  return icons[type] || "🏅";
}

export default function Activity({ activity }: ActivityProps) {
  const distanceKm = activity.distance >= 1000;

  return (
    <a
      href={`https://www.strava.com/activities/${activity.id}`}
      target="_blank"
      rel="noopener noreferrer"
      class="group block bg-bg-card border border-border rounded-xl p-5
             shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)]
             hover:bg-bg-card-hover hover:border-border-hover hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.5)]
             hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Header */}
      <div class="flex items-start gap-4 mb-4">
        <div
          class="flex items-center justify-center w-12 h-12 rounded-lg
                    bg-accent-subtle border border-accent-glow text-xl
                    group-hover:scale-105 transition-transform"
        >
          {getActivityIcon(activity.sport_type)}
        </div>
        <div class="flex-1 min-w-0">
          <h3
            class="font-display font-medium text-lg text-text-primary truncate
                      group-hover:text-accent transition-colors"
          >
            {activity.name}
          </h3>
          <p class="text-text-muted text-sm mt-0.5">
            {formatDate(activity.start_date)} at {formatTime(activity.start_date)}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <div class="text-text-muted text-xs font-semibold uppercase tracking-wider">Distance</div>
          <div class="font-mono font-bold text-xl text-text-primary">
            {formatDistance(activity.distance)}
            <span class="text-text-secondary text-sm font-normal ml-1">{distanceKm ? "km" : "m"}</span>
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-text-muted text-xs font-semibold uppercase tracking-wider">Duration</div>
          <div class="font-mono font-bold text-xl text-text-primary">{formatDuration(activity.moving_time)}</div>
        </div>

        <div class="space-y-1">
          <div class="text-text-muted text-xs font-semibold uppercase tracking-wider">Pace</div>
          <div class="font-mono font-bold text-xl text-text-primary">
            {formatPace(activity.average_speed)}
            <span class="text-text-secondary text-sm font-normal ml-1">/km</span>
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-text-muted text-xs font-semibold uppercase tracking-wider">Elevation</div>
          <div class="font-mono font-bold text-xl text-text-primary">
            {Math.round(activity.total_elevation_gain)}
            <span class="text-text-secondary text-sm font-normal ml-1">m</span>
          </div>
        </div>
      </div>

      {/* Description */}
      {activity.description && (
        <p class="text-text-secondary text-sm mt-4 pt-4 border-t border-border line-clamp-2">{activity.description}</p>
      )}
    </a>
  );
}
