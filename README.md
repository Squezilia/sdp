# Lena Monorepo

Lena is a small, opinionated monorepo boilerplate built around:

- Bun + Elysia for the backend
- Nuxt 4 for the frontend
- Shared packages for database access and runtime configuration

This repo is intended as a starting point for full‑stack apps with a clear separation between app code and infrastructure (database, config, tooling).

## Monorepo Layout

- `apps/backend` – Bun/Elysia HTTP API with Swagger docs
- `apps/frontend` – Nuxt 4 app
- `packages/database` – Prisma schema and client wrapper (`@lena/database`)
- `packages/config` – Centralized TypeScript + ESLint configs and runtime config (`@lena/config`)

The root `package.json` uses workspaces to tie everything together.

## Backend (`apps/backend`)

- Runtime: Bun
- Framework: Elysia
- Plugins:
  - `@elysiajs/swagger` – Swagger/OpenAPI UI

Features:

- `GET /` – returns `Hello Lena!!`
- Swagger documentation is served via the Swagger plugin.

Development:

```bash
# from repo root
bun install
bun run backend:dev
```

The backend listens on `http://localhost:3000`.

## Frontend (`apps/frontend`)

- Framework: Nuxt 4
- Language: TypeScript
- Extras: Nuxt ESLint module, fonts, hints, image module

TypeScript is configured through Nuxt’s `typescript.tsConfig` option and extends the shared base config in `packages/config`. Nuxt-style aliases (`#app`, `#components`, `#pages`, etc.) are also wired there.

Development:

```bash
# from repo root
bun install
bun run frontend:dev
```

The dev server will start on the port configured by Nuxt (typically `http://localhost:3000`, if not occupied by the backend).

## Packages

### `@lena/database` (`packages/database`)

- Holds the Prisma schema (`packages/database/prisma/schema.prisma`).
- Exposes a typed Prisma client and helper:
  - `prisma` – shared `PrismaClient` instance
  - `connectDatabase()` – helper to connect on startup

This keeps all database concerns out of the backend app itself.

### `@lena/config` (`packages/config`)

- Central place for:
  - Shared TypeScript base config (`tsconfig.base.json`)
  - Shared ESLint config (`eslint.config.mjs`)
  - Simple runtime configuration (`src/index.ts`)

Apps and other packages extend these configs instead of defining their own from scratch.

## Scripts (root)

From the repo root:

- `bun run backend:dev` – start backend in watch mode
- `bun run backend:start` – start backend with `NODE_ENV=production`
- `bun run backend:build` – placeholder (no build step yet)
- `bun run frontend:dev` – start Nuxt dev server
- `bun run frontend:start` – start built Nuxt app
- `bun run frontend:build` – build frontend for production
- `bun run database:generate` – run `prisma generate` using `packages/database/prisma/schema.prisma`
- `bun run database:push` – push Prisma schema to the database
- `bun run database:pull` – introspect database into Prisma schema
- `bun run lint` – run ESLint using the shared config in `@lena/config`

## Getting Started

1. Install dependencies:

   ```bash
   bun install
   ```

2. Set up your environment:

   - Create `.env` with any vars you need, especially `DATABASE_URL` for Prisma in `@lena/database`.

3. (Optional) Sync the database schema:

   ```bash
   bun run database:push
   ```

4. Run backend and/or frontend:

   ```bash
   bun run backend:dev
   bun run frontend:dev
   ```

You can now iterate on backend, frontend, and shared packages within a single monorepo, with all tooling and config centralized in `@lena/config`. 
