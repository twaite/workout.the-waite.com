import { Html } from "@elysiajs/html";

export default function Layout({ children }: { children?: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Workout App</title>
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
      </head>
      <body>
        <div id="app">{children}</div>
      </body>
    </html>
  );
}
