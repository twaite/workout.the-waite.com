// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Html } from "@elysiajs/html";
import Header from "./header";
import Footer from "./footer";
import PageHeader from "./page-header";

interface LayoutProps {
  children?: any;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    href: string;
  };
}

export default function Layout({ children, title, subtitle, action }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title} | Workout</title>
        <script src="https://unpkg.com/htmx.org@2.0.8"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Oswald:wght@500;700&family=Source+Sans+3:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="/app.css" rel="stylesheet" />
      </head>
      <body class="min-h-screen flex flex-col">
        <Header />
        <main class="flex-1 bg-bg-primary py-4">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader title={title} subtitle={subtitle} action={action} />
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
