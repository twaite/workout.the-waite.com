import { Html } from "@elysiajs/html";
import Layout from "../components/layout";

export default function Page() {
  return (
    <Layout>
      <div class="min-h-screen bg-bg-primary text-text-primary p-8">
        <h1 class="text-accent text-4xl font-mono font-bold mb-4">Workout App</h1>
        <p class="text-text-secondary font-mono">Developer-focused tracking</p>
      </div>
    </Layout>
  );
}
