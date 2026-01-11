import { Elysia } from "elysia";
import { html } from "@elysiajs/html";

import index from "./pages/index";

const app = new Elysia().use(html()).get("/", index).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
