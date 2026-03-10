# Workspace AI Agent Instructions

## Overview

This workspace is a PERN stack (PostgreSQL, Express, React, Node) project for a 3-day "Memory Refresh" sprint. It is structured with a TypeScript backend and a React (JSX, optionally TSX) frontend. The goal is to maximize type safety, clean architecture, and rapid iteration for interview prep.

## Build & Test Commands

- **Backend** (from `/backend`):
  - `npm run build` — Compile TypeScript (must be added)
  - `npm run dev` — Start dev server with auto-reload (must be added)
  - `npm run lint` — Lint TypeScript (must be added)
  - `npm test` — Run Jest tests (configured, but no tests yet)
- **Frontend** (from `/frontend`):
  - `npm run dev` — Vite dev server
  - `npm run build` — Production build
  - `npm run lint` — Lint React code
  - `npm run preview` — Preview built app
- **Database**: `docker-compose up` (Postgres 13)

## Architecture & Conventions

- **TypeScript 5.x, ES2022, ES modules** for backend
- **PascalCase** for types/classes, **camelCase** for variables, **kebab-case** for filenames
- **Layered backend**: controllers → services → repositories
- **Frontend**: React 19.2, Vite 7, components in `src/`
- **Error handling**: async/await, try/catch, no `any` types
- **Security**: Validate input, never hardcode secrets, use parameterized queries

## Common Pitfalls

- Backend must use ES2022 + ES modules (update `tsconfig.json` and `package.json`)
- Add missing backend scripts: `build`, `dev`, `lint`
- Use environment variables for DB credentials (not hardcoded)
- Frontend is JSX; consider migrating to TSX for type safety
- Add Jest tests for backend and frontend

## Key Files

- `/backend/tsconfig.json` — Set `target` and `module` to `es2022`
- `/backend/package.json` — Set `"type": "module"`, add scripts
- `/frontend/vite.config.js` — Vite config
- `/docker-compose.yml` — Postgres config

## Example Prompts

- "Add a backend build script and update to ES2022 modules."
- "Create a JWT auth middleware for Express."
- "Add a Jest test for the login controller."
- "Convert frontend to TypeScript (TSX)."
- "Wire up React dashboard to backend API."

## Related Customizations

- Create `/backend/AGENTS.md` for backend-specific agent rules
- Create `/frontend/AGENTS.md` for frontend/React conventions
- Add `/backend/.env.example` for environment variable documentation

---

For more details, see `.github/instructions/typescript-5-es2022.instructions.md` and project READMEs.
