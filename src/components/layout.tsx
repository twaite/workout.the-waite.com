// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";

export default function Layout({ children }: { children?: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Workout App</title>
        <script src="https://unpkg.com/htmx.org@2.0.8"></script>
        <link href="/app.css" rel="stylesheet" />
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
