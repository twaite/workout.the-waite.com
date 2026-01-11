import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { resolve } from "path";

import index from "./pages/index";

const app = new Elysia()
  .use(staticPlugin({ assets: resolve(process.cwd(), 'dist/styles'), prefix: '/' }))
  .use(html())
  .get("/", index)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
