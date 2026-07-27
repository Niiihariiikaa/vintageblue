# VintageBlue

Full-stack TypeScript app: React (Vite) frontend + Express API backend, managed as npm workspaces.

## Structure

```
vintageblue/
├── client/   # React 19 + Vite + TypeScript
├── server/   # Express + TypeScript API (port 3001)
└── package.json  # npm workspaces root
```

## Getting started

```sh
npm install       # installs both workspaces
npm run dev       # starts API (:3001) and client (:5173) together
```

Open http://localhost:5173 — API requests to `/api/*` are proxied to the Express server, so there are no CORS issues in development.

## Scripts (run from the root)

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Run server and client concurrently with reload |
| `npm run build` | Type-check and build both workspaces           |
| `npm run start` | Run the compiled production server             |
| `npm run lint`  | Lint the client                                |

## API endpoints

- `GET /api/health` — health check
- `GET /api/hello` — sample greeting
- `GET /api/items` — list items (in-memory demo data)
- `POST /api/items` — add an item (`{ "name": "..." }`)
