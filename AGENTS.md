# Agents

This document describes how to work with this codebase.

## Project Overview

A workout tracking app built with ElysiaJS, using @elysiajs/html for JSX rendering. Uses Bun as the runtime and Tailwind CSS v4 for styling.

## Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run dev:css` | Watch and rebuild Tailwind CSS |
| `bun run build` | Build CSS and compile to standalone binary (`workout-app`) |
| `bun run build:css` | Build Tailwind CSS for production |
| `bun run lint` | Run oxlint for code quality |
| `bun run lint:fix` | Run oxlint with auto-fix |
| `bun run format` | Format code with oxfmt |
| `bun run format:check` | Check formatting without modifying files |

## Code Style Guidelines

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are enforced
- Use explicit types for function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use `unknown` in catch blocks, never `any`
- Enable `skipLibCheck: true` for declaration files

### Imports

- Group imports in this order: external packages, internal modules, relative imports
- Use named imports for libraries: `import { Html } from "@elysiajs/html"`
- Use default imports for pages: `import index from "./pages/index"`
- Do not use barrel exports (`index.ts` re-exports)

### Naming Conventions

- **Files**: camelCase for `.ts`, PascalCase for `.tsx` (components/pages)
- **Components**: PascalCase function names
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for config values, camelCase otherwise
- **Props interfaces**: `ComponentNameProps` pattern

### JSX/Components

- Use `@elysiajs/html` Html.createElement and Html.Fragment
- JSX factory configured in tsconfig: `jsxFactory: "Html.createElement"`
- Export components as default functions
- Props should be typed with explicit interfaces

### Error Handling

- Use TypeScript's strict null checks
- Handle null/undefined explicitly with optional chaining and nullish coalescing
- Log errors with console.error for server-side errors
- Return proper HTTP status codes in Elysia route handlers

### Tailwind CSS

- Uses Tailwind CSS v4 with `@import "tailwindcss"` and `@theme` directives
- Custom theme colors defined in `src/styles/app.css`:
  - `--color-bg-primary`: #0a0a0a
  - `--color-bg-secondary`: #171717
  - `--color-accent`: #f97316
  - `--color-text-primary`: #ededed
  - `--color-text-secondary`: #a1a1aa
- Use CSS variables for colors, not hardcoded hex values
- Use `font-mono` for developer-focused UI (SF Mono/System monospace)

### Project Structure

```
src/
├── components/    # Reusable UI components (Layout, etc.)
├── pages/         # Route handlers with default exports
├── styles/        # Tailwind CSS with custom theme
└── index.ts       # Elysia app entry point
dist/
└── styles/        # Compiled CSS output
```

### Elysia Patterns

- Chain plugins with `.use()` method
- Use `.get()`, `.post()`, etc. for route handlers
- Access server info via `app.server?.hostname` / `app.server?.port`
- Static assets served from `dist/styles` via `@elysiajs/static`

### Code Quality

- Run `bun run lint` and `bun run format` before committing
- No comments required unless explaining complex business logic
- Keep functions small and focused on single responsibility
- Use early returns to reduce nesting
