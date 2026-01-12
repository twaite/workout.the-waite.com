import * as repo from "../repos/strava"

const STRAVA_API_URL = "https://www.strava.com/api/v3"
const STRAVA_TOKEN_URL = "https://www.strava.com/oauth/token"

interface StravaActivity {
  id: number
  name: string
  type: string
  sport_type: string
  start_date: string
  start_date_local: string
  timezone: string
  elapsed_time: number
  moving_time: number
  distance: number
  total_elevation_gain: number
  average_speed: number
  max_speed: number
  average_heartrate: number | null
  max_heartrate: number | null
  description: string | null
  calories: number | null
  start_latlng: [number, number] | null
  end_latlng: [number, number] | null
}

interface TokenData {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

async function refreshAccessToken(refreshToken: string, clientSecret: string): Promise<TokenData> {
  const response = await fetch(STRAVA_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${response.statusText}`)
  }

  const data = await response.json()
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: data.expires_at,
  }
}

async function getValidAccessToken(): Promise<string> {
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshTokenFromEnv = process.env.STRAVA_REFRESH_TOKEN

  if (!clientSecret) {
    throw new Error("STRAVA_CLIENT_SECRET not set in environment")
  }

  let tokens = await repo.getTokens()

  if (!tokens) {
    if (refreshTokenFromEnv) {
      tokens = await refreshAccessToken(refreshTokenFromEnv, clientSecret)
      await repo.saveTokens(tokens)
    } else {
      throw new Error("No Strava tokens found. Please authorize the application first.")
    }
  }

  const now = Math.floor(Date.now() / 1000)
  if (now >= tokens.expiresAt) {
    const newTokens = await refreshAccessToken(tokens.refreshToken, clientSecret)
    await repo.saveTokens(newTokens)
    return newTokens.accessToken
  }

  return tokens.accessToken
}

export async function fetchActivities(page: number = 1, perPage: number = 30): Promise<StravaActivity[]> {
  const accessToken = await getValidAccessToken()

  const response = await fetch(
    `${STRAVA_API_URL}/athlete/activities?page=${page}&per_page=${perPage}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch activities: ${response.statusText}`)
  }

  return response.json() as Promise<StravaActivity[]>
}

export async function fetchActivity(activityId: number): Promise<StravaActivity> {
  const accessToken = await getValidAccessToken()

  const response = await fetch(`${STRAVA_API_URL}/activities/${activityId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch activity: ${response.statusText}`)
  }

  return response.json() as Promise<StravaActivity>
}
