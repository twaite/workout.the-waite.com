import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { resolve } from "path";

import dashboard from "./pages/dashboard";
import stravaPage from "./pages/strava";
import { fetchActivities } from "./services/strava";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID
const STRAVA_REDIRECT_URI = process.env.STRAVA_REDIRECT_URI || "http://localhost:3000/auth/strava/callback"

const isDev = process.env.NODE_ENV !== "production";

const app = new Elysia()
  .use(staticPlugin({ assets: resolve(process.cwd(), 'dist/styles'), prefix: '/' }))
  .onAfterHandle(({ request, set }) => {
    if (isDev && request.url.endsWith('.css')) {
      set.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate';
    }
  })
  .use(html())
  .get("/", async () => {
    try {
      const activities = await fetchActivities(1, 10);
      return dashboard({ activities });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return dashboard({ error: message });
    }
  })
  .get("/strava", async () => {
    try {
      const activities = await fetchActivities();
      return stravaPage({ activities });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return stravaPage({ error: message });
    }
  })
  .get("/auth/strava", () => {
    const url = new URL("https://www.strava.com/oauth/authorize");
    url.searchParams.set("client_id", STRAVA_CLIENT_ID || "");
    url.searchParams.set("redirect_uri", STRAVA_REDIRECT_URI);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "read,activity:read");
    return new Response(null, {
      status: 302,
      headers: { Location: url.toString() }
    });
  })
  .get("/auth/strava/callback", async ({ query }) => {
    const code = query.code;
    if (!code) {
      return stravaPage({ error: "No authorization code provided" });
    }

    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: STRAVA_CLIENT_ID,
          client_secret: process.env.STRAVA_CLIENT_SECRET,
          code,
          grant_type: "authorization_code",
        }),
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`);
      }

      const data = await response.json();

      const { saveTokens } = await import("./repos/strava");
      await saveTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresAt: data.expires_at,
      });

      return new Response(null, {
        status: 302,
        headers: { Location: "/strava" }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return stravaPage({ error: `Authorization failed: ${message}` });
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
